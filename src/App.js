import './App.css';
import React from 'react';
import { BrowserRouter , Route ,Switch,Redirect} from 'react-router-dom';
import ProductList from './components/ProductList'; 
import ProductDetail from './components/ProductDetail'


const NotFound = () => <div>NotFound page</div>


function App() {
  return (
   <BrowserRouter>
    <div style={{width:'90%',margin:'10px auto'}}>
    <Switch>
      <Route  path={"/products/:id"}> 
        <ProductDetail></ProductDetail>
      </Route>
      <Route  path={"/products"}>
        <ProductList></ProductList>
      </Route>
        <Route  path="/">
        <Redirect to="/products"></Redirect>
      </Route>
      <Route>
        <NotFound/>
     </Route>
    </Switch>
   

   </div>
   </BrowserRouter>
  );
}

export default App;
