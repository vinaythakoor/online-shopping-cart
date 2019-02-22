import React, { Component } from 'react';
import './App.css';
import './styles/style.css';
import './styles/myapp.css'
import './styles/myapp2.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from './components/shared/Navbar';
import Home from './components/Home'
import addProjectTask from './components/addProjectTask'
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CategoryProducts from './components/CategoryProducts';
import SearchProduct from './components/SearchProduct'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import Login from './components/Login';
import UserForm from './components/registration/UserForm';
import Checkout from './components/Checkout';
import OrderConfirm from './components/checkoutcart/OrderConfirm';
import ManageProduct from './components/ManageProduct';
class App extends Component {
  render() {
    return (
     <Provider store={store}>
      <Router>
      <div className="App container-fluid">
         <Navbar />
        <Route exact path="/(|home|index)/" component={Home} />
        <Route exact path="/addProjectTask" component={addProjectTask} />
        <Route exact path="/category/1/products" component={CategoryProducts} />
        <Route exact path="/show/:pt_id/product" component={SingleProduct} />
        <Route exact path="/cart/add/:pt_id/product" component={Cart} />
        <Route exact path="/cart/validate" component={Checkout} />
        <Route exact path="/search" component={SearchProduct} />
        <Route exact path="/membership" component={UserForm} />
        <Route exact path="/manage/product" component={ManageProduct} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout"/>
      </div> 
      </Router>
      </Provider>
    );
  }
}

export default App;
