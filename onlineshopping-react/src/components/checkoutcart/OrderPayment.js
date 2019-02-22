import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
}  from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';


class OrderPayment extends Component {
 
  constructor(props) {
    super(props);
   
  }
  
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
        const { values, handleChange, payementHandler, cartlines, cart } = this.props;
        //console.log(cart)
        const muiTheme = getMuiTheme({
            fontFamily: 'Roboto, sans-serif',
           palette: {
             primary1Color: cyan500,
             primary2Color: cyan700,
             primary3Color: grey400,
             accent1Color: pinkA200,
             accent2Color: grey100,
             accent3Color: grey500,
             textColor: darkBlack,
             alternateTextColor: white,
             canvasColor: white,
             borderColor: grey300,
             disabledColor: fade(darkBlack, 0.3),
             pickerHeaderColor: cyan500,
             clockCircleColor: fade(darkBlack, 0.07),
             shadowColor: fullBlack,
            },
           appBar: {
             height: 50,
           },
         });
    return (
       
        <div class="row">
             <div class="col-md-6">
              
              {Object.keys(cartlines).map((cartpay, index) => {
                //console.log(cartlines[cartpay].productCount)
                let cartdetail = cartlines[cartpay];
                          return (
                          <div class="row">
                          <div class="col-12">
                           
                             <div>
                               <h3></h3>
                               <hr/>
                               <h4>Quantity - {cartdetail.productCount}</h4>
                               <h5>Buying Price - &#8377; {cartdetail.buyingPrice} /-</h5>
                               <h5>Total - &#8377; {cartdetail.total} /-</h5>							
                             </div>						
                             						
                           </div>
                         
                       </div>
                        );   
                   
                })}
                <hr/>
                <div class="text-right">
                  <h3>Grand Total - &#8377; {cart.grandTotal} /-</h3>
                </div>
              
            </div>
            
            <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                Payment Details
                            </h3>
                        </div>
                        <div class="card-body">
   
                        <form role="form">
                            <div class="form-group">
                                <label for="cardNumber">
                                    CARD NUMBER</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="cardNumber" placeholder="Valid Card Number"
                                        required autofocus />
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7 col-md-7">
                                    <div class="form-group">
                                        <label for="expityMonth">EXPIRY DATE</label>
                                        <br/>
                                        <div class="col-xs-6 col-lg-6 pl-ziro">
                                            <input type="text" class="form-control" id="expityMonth" placeholder="MM" required />
                                        </div>
                                        <div class="col-xs-6 col-lg-6 pl-ziro">
                                            <input type="text" class="form-control" id="expityYear" placeholder="YY" required /></div>
                                    </div>
                                </div>
                                <div class="col-5 col-md-5 pull-right">
                                    <div class="form-group">
                                        <label for="cvCode">
                                            CV CODE</label>
                                        <input type="password" class="form-control" id="cvCode" placeholder="CV" required />
                                    </div>
                                </div>
                            </div>
                            </form>
    
                            </div>
                    </div>
                    <ul class="nav nav-pills nav-stacked">
                        <li class="active"><a href="#"><span class="badge pull-right"> &#8377;  /-</span> Final Payment</a></li>
                    </ul>
                    <br/>
                    <button class="btn btn-success btn-lg btn-block" onClick={payementHandler}>Pay</button>
              </div>
         </div>
       )
    }
}

const styles = {
  button: {
    margin: 15
  },
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

export default withStyles(styles)(OrderPayment);
