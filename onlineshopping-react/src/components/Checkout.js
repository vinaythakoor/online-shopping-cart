import React, { Component } from 'react'
import { connect } from "react-redux";
import $ from 'jquery';
import PropTypes from "prop-types";
import { checkoutCart } from "../actions/projectTaskActions";
import { Addaddress } from "../actions/projectTaskActions";
import { saveAddress } from "../actions/projectTaskActions";
import {withRouter} from 'react-router';
import OrderAddress from './checkoutcart/OrderAddress';
import OrderConfirm from './checkoutcart/OrderConfirm';
import OrderPayment from './checkoutcart/OrderPayment';

export class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            addressLineOne: '', addressLineOneError: "",
            addressLineTwo: '', addressLineTwoError: "",
            city: '',cityError: "",
            postalCode: '',postalCodeError: "",
            state: '',stateError: "",
            country: '', countryError: "" ,     
            select: false,
            addressId: ''
        };
        this.saveAddress = this.saveAddress.bind(this);
        this.setAdd = this.setAdd.bind(this);
        this.payementHandler = this.payementHandler.bind(this);
     }

    componentDidMount() {
        this.props.checkoutCart();
 	}
   
      saveAddress () {
        const Address = {
            addressLineOne: this.state.addressLineOne,
            addressLineTwo: this.state.addressLineTwo,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            postalCode: this.state.postalCode
        }
      }
 
      setAdd = (Address) => {
         this.setState({
            addressId: Address.id,
            addressLineOne: Address.addressLineOne,
            addressLineTwo: Address.addressLineTwo,
            city: Address.city,
            postalCode: Address.postalCode,
            state: Address.state,
            country: Address.country,
            select:true     
        });
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    } 
    
    payementHandler() {
        //const select = this.state.select;
        if( this.state.select === true){
            let addressId = this.state.addressId
            this.props.saveAddress(addressId)  
        }else{
            const Address = {
                addressLineOne: this.state.addressLineOne,
                addressLineTwo: this.state.addressLineTwo,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                postalCode: this.state.postalCode
            }
            this.props.Addaddress(Address)
        }
        const { step } = this.state;
        this.setState({
            step: step + 1
        });

    }

    // Proceed to next step
    nextStep = () => {
    const { step } = this.state;
    const err = this.validate();
    if (!err) {
    this.setState({
        step: step + 1
    });
    }
    };

    // Go back to prev step
    prevStep = () => {
    const { step } = this.state;
    this.setState({
        step: step - 1
    });
    };

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

      //validation

  validate = () => {
    let isError = false;
    const errors = {
        addressLineOneError: "",
        addressLineTwoError: "",
        cityError: "",
        postalCodeError: "",
        stateError: "",
        countryError: "",

    };

    if (!this.state.addressLineOne) {
        isError = true;
        errors.addressLineOneError = "Please Enter addressLineOne!";
    }
    
    if (!this.state.addressLineTwo) {
        isError = true;
        errors.addressLineTwoError = "Please Enter addressLineTwo";
    }
    
    if (!this.state.city) {
        isError = true;
        errors.cityError = "Please Enter city!";
    }
    
    if (!this.state.postalCode) {
        isError = true;
        errors.postalCodeError = "Please Enter postalCode!";
    }
    
    if (!this.state.state) {
        isError = true;
        errors.stateError = "Please Enter state!";
    }
    
    if (!this.state.country) {
        isError = true;
        errors.countryError = "Please Enter country!";
    }
    
        this.setState({
        ...this.state,
        ...errors
        });

    return isError;
    };

 
    render() {
        let cart;
        const { checkout_products } = this.props.checkout_products; 
        const { order_details } = this.props.order_details; 
        const { step } = this.state;
        const {  addressLineOne, addressLineTwo, city, postalCode,
            state, country, addressLineOneError,
            addressLineTwoError, cityError, postalCodeError, stateError, countryError
        } = this.state;
        
        const values = { addressLineOne, addressLineTwo, city, postalCode,
            state, country, addressLineOneError,
            addressLineTwoError, cityError, postalCodeError, stateError, countryError };
      
            Object.keys(checkout_products).map((item, index) => {
                //console.log(item)
                 if (item == "cart") {
                    //console.log(checkout_products[item].grandTotal)    
                    cart = checkout_products[item];
                } 
            })
                 switch (step) {
                    case 1:
                        return (
                            <div className="container">
                                {Object.keys(checkout_products).map((item, index) => {
                                    //console.log(item)
                                    if (item == "Address") {
                                        let Address = checkout_products[item];
                                        //console.log(Address)
                                        return (
                                            <OrderAddress
                                            nextStep={this.nextStep}
                                            setAddress={this.setAddress}
                                            handleChange={this.handleChange}
                                            setAdd={this.setAdd}
                                            saveAddress={this.saveAddress}
                                            values={values}
                                            Address = {Address}
                                            validate={this.validate}
                                        />
                                        );
                                     
                                    } 
                                })}
                        </div>
                        );
                    case 2:
                    return (
                    <div class="container mt-5">
                    {Object.keys(checkout_products).map((item, index) => {
                        //console.log(item)
                        if (item == "cartLines") {
                            let cartlines = checkout_products[item];
                            //console.log(cart)
                            return (
                                <OrderPayment
                                    nextStep={this.nextStep}
                                    prevStep={this.prevStep}
                                    handleChange={this.handleChange}
                                    payementHandler={this.payementHandler}
                                    values={values}
                                    cartlines= {cartlines}
                                    cart = {cart}
                                />
                            );
                         } 
                    })}
                    </div>
                    );
                    case 3: 
                    return (
                        <div>
                        {Object.keys(order_details).map((item, index) => {
                           // console.log(item)
                            if (item == "order") {
                              let order =  order_details[item]
                               // console.log(order.orderDetail)
                               return Object.keys(order).map((item, index) => {
                                    if (item == "order") {
                                    let orderdetail = order[item]
                                    console.log(orderdetail)
                                return (
                                    <OrderConfirm
                                        nextStep={this.nextStep}
                                        prevStep={this.prevStep}
                                        handleChange={this.handleChange}
                                        payementHandler={this.payementHandler}
                                        values={values}
                                        orderdetail = {orderdetail}
                                    />
                                    );
                                    }
                                })    
                             } 
                        })}
                        </div> 
                    ); 
                }
            }
    }

    Checkout.propTypes = {
        checkoutCart: PropTypes.func.isRequired,
        Addaddress: PropTypes.func.isRequired,
        saveAddress: PropTypes.func.isRequired,
        checkout_products: PropTypes.object.isRequired,
        order_detail: PropTypes.object.isRequired
      };
      
      const mapStateToProps = state => ({
        checkout_products: state.project_task,
        order_details: state.project_task
      });
       
      export default connect(
        mapStateToProps,
        { checkoutCart, Addaddress, saveAddress }
      )(Checkout);
   
