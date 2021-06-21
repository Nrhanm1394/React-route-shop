import React,{useState,useEffect} from 'react'
import { Link, useLocation,useHistory,useRouteMatch ,Route} from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Button,Typography,Paper} from'@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginTop: 50,
        width: '50ch',    
      }, 
    },
    Container:{
      width: '50%',
      height: 'auto',
      display: 'block',
      margin: 'auto',    
 
    },
     paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: '100%',
      background: 'SEASHELL',
    },
}));
const ProductList = () => {
    const [products,setProducts] = useState ([])
    const {pathname,search } = useLocation()
    const { searchs } = useLocation()
    const { category } = queryString.parse(search)
    const history = useHistory()
  
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
          .then((res) => {
            setProducts(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [category]);




    return (
        <div>
                   <header style={{textAlign:'center',marginBlock:'10px',fontSize:'20px'}}><h1>All Products</h1></header>
           
            <div
                style={{display:'flex',justifyContent:'space-around',marginBottom:'20px'}}    
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
              {products.map((data,id) => (
                <ProductDetail key={id} {...data}/>
            ))}
        </div>
     
    )

}

const ProductDetail = (props) =>{
    const history = useHistory();
  const {id,desc, image, name, price,category} = props;
  const filterProductsByCategory = () => history.push(`/products/${id}`) 
  const classes = useStyles();



    return(
    <div  className={classes.root}>
        <Paper className={classes.paper} >
            <Grid container spacing={2}>
                <Grid item>
                    <Button onClick={filterProductsByCategory}>
                        <img src={image}  alt=" " style={{width:400,height:250}} />
                        <Typography gutterBottom variant="subtitle1" >
                            <h2 >{name}</h2>  
                            <h4 style={{textAlign:'left',margin:'15px'}}>{desc}</h4>
                            <h5><div style={{textAlign:'left',margin:'15px'}}>Price : ฿{price}</div>
                            <div style={{textAlign:'right',margin:'15px'}} >{category}</div> </h5>
                        </Typography> 
                    </Button>       
                </Grid>
            </Grid>
      </Paper>

     

    </div>
    )
}

export default ProductList