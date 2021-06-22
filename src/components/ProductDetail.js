import React,{ useEffect, useState} from 'react'
import { useParams,useHistory } from 'react-router-dom';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Button,Typography,Paper,Toolbar,AppBar,Link} from'@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop:'50px',
      '& .MuiTextField-root': {
      }, 
    },
     paper: {
      margin: '50px',
      background: '#c2d6d6',
      
    },AppBar:{
    height:'1px'
     
    },Toolbar:{
      backgroundColor: '#c2d6d6',
    },
}));

const ProductDetails = () => {
    const [products,setProducts] = useState ([])
    const {id} = useParams()
    const classes = useStyles()
    const history = useHistory()
    const filterProductsByCategory = () => history.push(`/products?category=${products.category}`)
    useEffect(() => {
        axios
          .get(`http://localhost:5000/products/${id}`)
          .then((response) => {
            setProducts (response.data);
            console.log(products)
    
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id]);

    return (
        <div  className={classes.root}>
          <AppBar className={classes.AppBar}>
          <Toolbar className={classes.Toolbar}>
              <Button>
                  <Typography onClick={filterProductsByCategory}>
                    <h4>Category : {products.category}</h4>
                  </Typography>
              </Button>
          </Toolbar>
        </AppBar> 
            
        <Paper className={classes.paper} >
            <Grid >
                <Grid >
                  <Button item>
                      <Typography>
                      <img src={products.image}  alt=" " style={{width:500,height:'auto'}} />
                      </Typography>
                        <Typography  >
                            <h1 style={{textAlign:'center',margin:'15px'}}>{products.name}</h1>  
                            <p style={{textAlign:'left',margin:'30px'}}>{products.desc}</p>
                            <h2 style={{textAlign:'left',margin:'15px'}}>Price : ฿{products.price} </h2>
                        </Typography> 
                        </Button>
                </Grid>
            </Grid>
      </Paper>
    </div>
  
    );
};

export default ProductDetails