import React,{useState,useEffect} from 'react'
import { Link, useLocation,useHistory} from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Button,Paper,Container,AppBar,Toolbar,Typography} from'@material-ui/core';


const useStyles = makeStyles((theme) => ({
   
  root: {
      '& .MuiTextField-root': {
        marginTop: 1,
        width: '50ch', 

      }, 
    },
    Container:{
      margin: '5px auto',    
    },
     paper: {
      margin: 'auto',
      maxWidth: '100%',
      background: '#c2d6d6',
    },
    AppBar:{
    
     
    },Toolbar:{
      backgroundColor: '#c2d6d6',
      
    },
}));
const ProductList = () => {
    const [products,setProducts] = useState ([])
    const {pathname,search } = useLocation()
    const { category } = queryString.parse(search)
    const classes = useStyles()
    useEffect(() => {
        axios
          .get(`http://localhost:5000/products`)
          .then((response) => {
            setProducts (response.data);
            console.log(products)
    
          })
          .catch((error) => {
            console.log(error)
          })
      }, [search]);

      useEffect(() => {
        axios
          .get(
            category
              ? `http://localhost:5000/products?category=${category}`: `http://localhost:5000/products`
          )
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [category]);
    return (
      <div >  
     <div>
        <AppBar className={classes.AppBar}>
          <Toolbar className={classes.Toolbar}>
            <Typography > 
            <Link to='/' ><h4>PRODUCTS</h4></Link>
          </Typography>
          </Toolbar>
        </AppBar> 
     </div>
       
            <div
                style={{display:'flex',justifyContent:'space-around',marginBottom:'30px',paddingTop:'80px'}}    
            >
              
               <Link to={`${pathname}?category=Headphone`}> <button>Headphone</button></Link>
               <Link to={`${pathname}?category=Watch`}> <button>Watch</button></Link>
               <Link to={`${pathname}?category=Camera`}> <button>Camera</button></Link>
               <Link to={`${pathname}?category=Nature`}> <button>Nature</button></Link>
               <Link to={`${pathname}?category=Computer`}> <button>Computer</button></Link>
               <Link to={`${pathname}?category=Book`}> <button>Book</button></Link>
               <Link to={`${pathname}?category=Lotion`}> <button>Lotion</button></Link>
               <Link to={`${pathname}?category=Eyeglass`}> <button>Eyeglass</button></Link>

            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
                  {products.map((data,id)  =>(
                    <ProductDetail key={id} {...data} style={{flexDirection:'column',justifyContent:'space-around'}}>
                    </ProductDetail>
                  ))}
            </div>
        </div>
     
    )

}
const ProductDetail = (props) =>{
  const history = useHistory()
  const {image, name,id,desc,price,category} = props;
  const filterProductsByCategory = () => history.push(`/products/${id}`) 
  const classes = useStyles()
    return(
    
    <div  className={classes.root}>
        <Container className={classes.Container}>  
        <Paper variant="outlined" square  className={classes.paper} >
            <Grid >
            <img src={image}  alt=" " style={{width:330,height:150}} />
                <Grid >
                
                    <Button onClick={filterProductsByCategory}>
                      <div>
                            <p style={{fontSize:'5mm'}}>{name}</p>  
                            <h5 style={{textAlign:'left'}}>{desc}</h5>
                            <div style={{textAlign:'left'}}>Price : ฿{price}</div>
                            <div style={{textAlign:'right'}} >{category}</div> 
                      </div>
                    </Button>       
                </Grid>
            </Grid>
      </Paper>
      </Container>
    </div>
    )
}
 

export default ProductList