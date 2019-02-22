import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormbillingDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  componentDidMount() {
    console.log(this.props.values.firstName)
  }

  render() {
    const { values, handleChange } = this.props;
    return (

      <div className="container">
            <div className="row mt-3">
                <div class="offset-lg-3"></div>
                <div class="col-lg-6" style={{'margin': 'auto'}}>
                <MuiThemeProvider>
                  <React.Fragment>
                    <AppBar title="Enter Billing Details" />
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
                      <RaisedButton
                        label="Back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back}
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
  }
};

export default FormbillingDetails;