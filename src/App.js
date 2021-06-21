import './App.css';
import React from 'react';
import { BrowserRouter , Route ,Link,Switch,Redirect} from 'react-router-dom';
import ProductList from './components/ProductList'; 
// import ProductDetail from './components/ProductDetail'


const NotFound = () => <div>NotFound page</div>


function App() {
  return (
   <BrowserRouter>
    <nav >
      <Link to='/products' style={{marginRight:'10px '}}>Products</Link>
    </nav>
    <div style={{width:'60%',margin:'50px auto'}}>
    <Switch>
      {/* <Route path={"products/:id"}> 
        <ProductDetail></ProductDetail>
      </Route> */}
      <Route path={"/products"}>
        <ProductList></ProductList>
      </Route>
        <Route exact path="/">
        <Redirect to="/products"></Redirect>
      </Route>
      <Route>
      <NotFound/>
     </Route>
    </Switch>
   
   
    {/* <Switch>
     <Route path='/products'>
       <ProductList />
     </Route>
     <Route>
      <NotFound/>
     </Route>
    </Switch> */}
   </div>
   </BrowserRouter>
  );
}

export default App;
