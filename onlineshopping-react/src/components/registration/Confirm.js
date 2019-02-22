import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import  {Signup}  from '../../actions/projectTaskActions'
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
    this.confirmdetails()
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  confirmdetails(){
        const UserDetails = {
          addressLineOne: this.props.values.addressLineOne,
          addressLineTwo: this.props.values.addressLineTwo,
          city: this.props.values.city,
          state: this.props.values.state,
          country: this.props.values.country,
          postalCode: this.props.values.postalCode,
          firstName: this.props.values.firstName,
          lastName: this.props.values.lastName,
          email: this.props.values.email,
          contactNumber: this.props.values.contactNumber,
          role: this.props.values.role,
          password:this.props.values.password
          };
         
         this.props.Signup( UserDetails );
  }
  render() {
    
    const {
      values: { firstName, lastName, email, contactNumber,
         role, addressLineOne, addressLineTwo, city, postalCode,
        state, country }
    } = this.props;
   
    return (

    <div className="container">
      <div className="row ">
            <MuiThemeProvider>
              <React.Fragment>
              <div class="col-lg-6 mt-3" style={{'margin': 'auto'}}>
                 <AppBar title="Confirm User Data" />
                <List>
                  <ListItem primaryText="First Name" secondaryText={firstName} />
                  <ListItem primaryText="Last Name" secondaryText={lastName} />
                  <ListItem primaryText="Email" secondaryText={email} />
                  <ListItem primaryText="Contact Number" secondaryText={contactNumber} />
                  <ListItem primaryText="Role" secondaryText={role} />
                  </List>
                <br />
                </div>

                <div class="col-lg-6 mt-3" style={{'margin': 'auto'}}>
                 <AppBar title="Confirm User Data" />
                <List>
                  <ListItem primaryText="Address Line One" secondaryText={addressLineOne} />
                  <ListItem primaryText="Address Line Two" secondaryText={addressLineTwo} />
                  <ListItem primaryText="City" secondaryText={city} />
                  <ListItem primaryText="Postal Code" secondaryText={postalCode} />
                  <ListItem primaryText="State" secondaryText={state} />
                  <ListItem primaryText="Country" secondaryText={country} />
                 </List>
                <br />
                </div>
                <div class="col-lg-12 text-center">
                  <RaisedButton
                    label="Confirm & Continue"
                    id = "Confirm & Continue"
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
        </div>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

 
Confirm.propTypes = {
  Signup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { Signup }
)(Confirm);