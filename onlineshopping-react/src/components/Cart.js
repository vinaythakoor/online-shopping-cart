import React, { Component } from 'react';
import { connect } from "react-redux";
import $ from 'jquery';
import PropTypes from "prop-types";
import { getCart } from "../actions/projectTaskActions";
import { checkoutCart } from "../actions/projectTaskActions";
import {withRouter} from 'react-router'; 
import Cartproduct from './Cart/Cartproduct';
import Cartfoot from './Cart/Cartfoot';

class Cart extends Component {
 
	constructor(props) {
    super(props);
    this.state = {
			showingAlert: false,
			cart: []
    };
	}
 
  componentDidMount() {
		var id = this.props.match.params.pt_id;
		this.props.getCart(id, this.props.history)
	}
  
	handleClickShowAlert() {
    this.setState({
      showingAlert: true
    });
    
    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    }, 2000);
  }

  render() {
		const { cart_products } = this.props.cart_products;
		//console.log(cart_products)
		let val;
		let message;
		let cartproducts;
		 
 		Object.keys(cart_products).map((item, index) => {
      if (item === "cartLines") {
				val = cart_products[item];
        console.log(val.length); 
 			} 
		})
		
		Object.keys(cart_products).map((item, index) => {
      if (item === "message") {
				message = cart_products[item];
        console.log(message); 
 			} 
    })

		return (
			<div ClassName="container" >
 
						{ !!(message) ? (
							<div>
							<div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`}>
								<strong>Success!</strong> {message}
							</div> 
						</div>
						) : (<div></div>)}
      	
	
				{ !!(val) ? (
				 
					<table id="cart" ClassName="table table-hover table-condensed">
					<thead>
						<tr>
							<th style={{'width': '50%'}}>Product</th>
							<th style={{"width": "10%"}}>Price</th>
							<th style={{"width": "8%"}}>Quantity</th>
							<th style={{"width": "22%"}} ClassName="text-center">Subtotal</th>
							<th style={{"width": "10%"}}></th>
						</tr>
					</thead>
					
						<tbody>
							{Object.keys(cart_products).map((item) => {
								// console.log(item)
								 if (item === "cartLines") {
									 return cart_products.cartLines.map((cart, index) => {
										//console.log(cart) 
										return (
												 <Cartproduct
													 key={index}
													 cart={cart}
												 />
											 );
											
									 });
								 }else{
									 return ""
								 }
							 })}
						</tbody>
					
						<tfoot>
						<div>
						{Object.keys(cart_products).map((item,index) => {
							if (item === "cart") {
							 let cartinfo = cart_products[item];
								 console.log(cartinfo.grandTotal)
								 return(
									//{single_product[item].name},
									<Cartfoot
									 key={index}
									 cartinfo={cartinfo}
	 							 />
							 )
							 } 
					})}
					</div>
						</tfoot>
				</table>
	
					):(
						<div ClassName="jumbotron">

						<h3 ClassName="text-center">Your Cart is Empty!</h3>
		
					</div>
		
			)}
 </div>

    )
  }
}

Cart.propTypes = {
	getCart: PropTypes.func.isRequired,
	checkoutCart : PropTypes.func.isRequired,
  cart_products: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart_products: state.project_task
});

export default connect(
  mapStateToProps,
  { getCart, checkoutCart }
)(Cart);

