import React, { Component } from 'react';
import FormbillingDetails from './FormbillingDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import { Signup } from '../../actions/projectTaskActions'

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: '', firstNameError: "",
    lastName: '', lastNameError: "",
    email: '', emailError: "",
    contactNumber: '', contactNumberError: "",
    password:'', passwordError: "",
    confirmPassword: '', confirmPasswordError: "",
    role: 'USER', roleError: "",
    addressLineOne: '', addressLineOneError: "",
    addressLineTwo: '', addressLineTwoError: "",
    city: '',cityError: "",
    postalCode: '',postalCodeError: "",
    state: '',stateError: "",
    country: '', countryError: "",
    };
 
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

      radioChecked = (name) => {
          console.log(name)
          this.setState({
            role: name
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
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        contactNumberError: "",
        passwordError: "",
        confirmPasswordError: "",
        roleError: "",
        addressLineOneError: "",
        addressLineTwoError: "",
        cityError: "",
        postalCodeError: "",
        stateError: "",
        countryError: "",

        };

        if(this.state.step == 1){
            if (!this.state.firstName) {
                isError = true;
                errors.firstNameError = "Please Enter First Name!";
            }
    
            if (!this.state.lastName) {
                isError = true;
                errors.lastNameError = "Please Enter Last Name!";
            }
              
            if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Plaese Enter Valid Email!";
            } 
    
            if (!this.state.contactNumber) {
                isError = true;
                errors.contactNumberError = "Please Enter contact Number";
            }
    
            if (!this.state.password) {
                isError = true;
                errors.passwordError = "Please Enter password!";
            }
    
            if (this.state.confirmPassword !== this.state.password) {
                isError = true;
                errors.confirmPasswordError = "ConfirmPassword does not match Password!";
            }
    
        }

        if(this.state.step == 2){
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

        }
 
        this.setState({
        ...this.state,
        ...errors
        });

    return isError;
  };
  


  render() {
    const { step } = this.state;
    const { firstName, lastName, email, contactNumber, password, 
        confirmPassword, role, addressLineOne, addressLineTwo, city, postalCode,
        state, country, firstNameError, lastNameError, emailError, contactNumberError,
        passwordError, confirmPasswordError, roleError, addressLineOneError,
        addressLineTwoError, cityError, postalCodeError, stateError, countryError
 } = this.state;
    
    const values = { firstName, lastName, email, contactNumber, password, 
        confirmPassword, role, addressLineOne, addressLineTwo, city, postalCode,
        state, country, firstNameError, lastNameError, emailError, contactNumberError,
        passwordError, confirmPasswordError, roleError, addressLineOneError,
        addressLineTwoError, cityError, postalCodeError, stateError, countryError };
 
            switch (step) {
                case 1:
                    return (
                    <FormPersonalDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        radioChecked = {this.radioChecked}
                        values={values}
                        validate={this.validate}
                    />
                    );
                case 2:
                    return (
                    <FormbillingDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                    );
                case 3:
                    return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                     />
                    );
                case 4:
                    return <Success />;
                }
          
  }
}

export default UserForm;