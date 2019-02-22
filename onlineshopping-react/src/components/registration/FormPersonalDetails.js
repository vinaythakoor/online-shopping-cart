import React, { Component } from 'react';
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
 
export class  FormPersonalDetails extends Component {

  state = {
    selectedValue: 'USER',
  };

  continue = e => {
    e.preventDefault();
    const err = this.props.validate();
    if (!err) {
       this.props.nextStep();
    }   
  };
  
  radiohandleChange = event => {
    this.setState({ selectedValue: event.target.value });
    this.props.radioChecked(event.target.value);
  };

  render() { 
 
    const { values, handleChange } = this.props;
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
      <div className="container">
      <div className="row mt-3">
          <div class="offset-lg-3"></div>
          <div class="col-lg-6" style={{'margin': 'auto'}}>

            <MuiThemeProvider  muiTheme={muiTheme}>
              <React.Fragment>
                <AppBar title="Enter User Details" />
                <TextField
                  hintText="Enter Your First Name"
                  floatingLabelText="First Name"
                  onChange={handleChange('firstName')}
                  errorText={values.firstNameError}
                  defaultValue={values.firstName}
                  fullWidth
                />
                <br />
                <TextField
                  hintText="Enter Your Last Name"
                  floatingLabelText="Last Name"
                  onChange={handleChange('lastName')}
                  defaultValue={values.lastName}
                  errorText={values.lastNameError}
                  fullWidth
                />
                <br />
                <TextField
                  hintText="Enter Your Email"
                  floatingLabelText="Email"
                  onChange={handleChange('email')}
                  defaultValue={values.email}
                  errorText={values.emailError}
                  fullWidth
                />
                <br />
                <TextField
                  hintText="Enter Your contactNumber"
                  floatingLabelText="contactNumber"
                  type="number"
                  id = "contactNumber"
                  onChange={handleChange('contactNumber')}
                  defaultValue={values.contactNumber}
                  errorText={values.contactNumberError}
                  fullWidth 
                />
                <br />
                <TextField
                  hintText="Enter Your password"
                  floatingLabelText="password"
                  onChange={handleChange('password')}
                  defaultValue={values.password}
                  errorText={values.passwordError}
                  type="password"
                  fullWidth
                />
                <br />
                <TextField
                  hintText="Enter Your confirmPassword"
                  floatingLabelText="confirmPassword"
                  onChange={handleChange('confirmPassword')}
                  defaultValue={values.confirmPassword}
                  errorText={values.confirmPasswordError}
                  type="password"
                  fullWidth
                />
                <br /> 
                  <Radio
                    checked={this.state.selectedValue === 'USER'}
                    onChange={this.radiohandleChange}
                    value="USER"
                    name="radio-button-demo"
                    aria-label="USER"
                  />
                  <Radio
                    checked={this.state.selectedValue === 'Supplier'}
                    onChange={this.radiohandleChange}
                    value="Supplier"
                    name="radio-button-demo"
                    aria-label="Supplier"
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
                <div class="offset-lg-3"></div>
            </div>
          </div>
    );
    
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

export default withStyles(styles)(FormPersonalDetails);