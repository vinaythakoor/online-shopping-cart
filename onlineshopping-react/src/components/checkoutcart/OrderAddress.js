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
 
class OrderAddress extends Component {
 
  constructor(props) {
    super(props);
    let cart =  this.props.cart;
     
    this.continueAddress = this.continueAddress.bind(this);
    }

    continueAddress = e => {
      this.props.setAdd(this.props.Address, e);
    }
    continue = e => {
        e.preventDefault();
        const err = this.props.validate();
        if (!err) {
           this.props.nextStep();
        }  
     };
      
    render() {
        const { values, handleChange, Address } = this.props;
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
         <div class="row mt-5">
      
              <div class="col-md-4">
                  <hr />
                  <h3 class="font-weight-bold">Select Shipping Address</h3>
                  <hr />
      
                  <div class="row">
                           <div class="col-12">
                              <h5>{Address.addressLineOne}</h5>
                              <h5>{Address.addressLineTwo}</h5>
                              <h5>{Address.city} - {Address.postalCode}</h5>
                              <h5>{Address.state} - {Address.country}</h5>
                              <hr/>
                              <div class="text-center">
                              <button class="btn btn-primary" onClick={this.continueAddress}>Select</button>
                                   
                              </div>
                          </div>
                   </div>
       
              </div>
      
              <div class="col-md-8">
      
      
                  <div class="card">
      
                      <div class="card-header">
                          <h3 class="font-weight-bold">Sign Up - Address</h3>
                      </div>
      
                      <div class="card-body">

                        <MuiThemeProvider  muiTheme={muiTheme}>
                        <React.Fragment>
                            <AppBar title="Enter User Details" />
                            <TextField
                            hintText="Enter Your addressLineOne"
                            floatingLabelText="addressLineOne"
                            onChange={handleChange('addressLineOne')}
                            defaultValue={values.addressLineOne}
                            errorText={values.addressLineOneError}
                            fullWidth
                          />
                          <br />
                          <TextField
                            hintText="Enter Your addressLineTwo"
                            floatingLabelText="addressLineTwo"
                            onChange={handleChange('addressLineTwo')}
                            defaultValue={values.addressLineTwo}
                            errorText={values.addressLineTwoError}
                            fullWidth
                          />
                          <br />
                          <TextField
                            hintText="Enter Your city"
                            floatingLabelText="city"
                            onChange={handleChange('city')}
                            defaultValue={values.city}
                            errorText={values.cityError}
                            fullWidth
                          />
                          <br />
                          <TextField
                            hintText="Enter Your postalCode"
                            floatingLabelText="postalCode"
                            onChange={handleChange('postalCode')}
                            defaultValue={values.postalCode}
                            errorText={values.postalCodeError}
                            fullWidth
                          />
                          <br />
                          <TextField
                            hintText="Enter Your state"
                            floatingLabelText="state"
                            onChange={handleChange('state')}
                            defaultValue={values.state}
                            errorText={values.stateError}
                            fullWidth
                          />
                          <br />
                          <TextField
                            hintText="Enter Your country"
                            floatingLabelText="country"
                            onChange={handleChange('country')}
                            defaultValue={values.country}
                            errorText={values.countryError}
                            fullWidth
                          />
                            <br /> 
                              
                        <div class="text-center">
                            <RaisedButton
                            label="Continue"
                            primary={true}
                            style={styles.button}
                            onClick={this.continue}
                            />
                            </div>
                        </React.Fragment>
                        </MuiThemeProvider>
                      </div>
                   </div>
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
  
  
export default withStyles(styles)(OrderAddress);
