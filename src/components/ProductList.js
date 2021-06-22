import React,{useState,useEffect} from 'react'
import { Link, useLocation,useHistory} from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Button,Typography,Paper,Container} from'@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginTop: 10,
        width: '50ch',    
      }, 
    },
     paper: {
      padding: theme.spacing(1),
      margin: 'auto',
      maxWidth: '100%',
      background: 'SEASHELL',
      

    },
}));
const ProductList = () => {
    const [products,setProducts] = useState ([])
    const {pathname,search } = useLocation()
    const { category } = queryString.parse(search)
  
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
        <div>
          <nav >
            <Link to='/' ><Button >PRODUCTS</Button></Link>
         </nav>
            <header style={{textAlign:'center',marginBottom:'10px',fontSize:'20px'}}><h1>All Products</h1></header>
       
            <div
                style={{display:'flex',justifyContent:'space-around',marginBottom:'30px'}}    
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
                    <ProductDetail key={id} {...data} style={{border: '1px solid gray',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                    </ProductDetail>
                  ))}
            </div>
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
        <Container>  
        <Paper className={classes.paper} >
            <Grid >
                <Grid >
                    <Button onClick={filterProductsByCategory}>
                      <div>
                            <img src={image}  alt=" " style={{width:250,height:150}} />
                            <h5 >{name}</h5>  
                            <h6 style={{textAlign:'left',margin:'15px'}}>{desc}</h6>
                            <h6><div style={{textAlign:'left',margin:'15px'}}>Price : ฿{price}</div>
                            <div style={{textAlign:'right',margin:'15px'}} >{category}</div> </h6>
                      </div>
                        {/* <img src={image}  alt=" " style={{width:400,height:250}} />
                        <Typography gutterBottom variant="subtitle1" >
                            <h2 >{name}</h2>  
                            <p style={{textAlign:'left',margin:'15px'}}>{desc}</p>
                            <h5><div style={{textAlign:'left',margin:'15px'}}>Price : ฿{price}</div>
                            <div style={{textAlign:'right',margin:'15px'}} >{category}</div> </h5>
                        </Typography>  */}
                    </Button>       
                </Grid>
            </Grid>
      </Paper>
      </Container>
    </div>
    )
}
 

export default ProductList