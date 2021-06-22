import React,{ useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Button,Typography,Paper,Container} from'@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
      }, 
    },
    Container:{
      width: '300PX',
      height: 'auto',
      display: 'block',
      margin: 'auto',    
    },
     paper: {
      margin: 'auto',
      background: 'SEASHELL',
    },
}));

const ProductDetails = () => {
    const [products,setProducts] = useState ([])
    const {id} = useParams()
    const classes = useStyles()
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
        <Container>
          
        <Paper className={classes.paper} >
            <Grid >
                <Grid >
                  <Button>
                  <Typography>
                    <h1 style={{margin:'15px'}} >Category : {products.category}</h1>
                    </Typography>
                  </Button>
                  <Button item>
                  
                      <Typography>
                      <img src={products.image}  alt=" " style={{width:500,height:300}} />
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
      </Container>
    </div>
  
    );
};

export default ProductDetails