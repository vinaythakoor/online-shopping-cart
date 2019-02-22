import React, { Component } from 'react'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <div className="container">
      <div className="row mt-3">
          <div className="offset-lg-3"></div>
          <div className="col-lg-6" style={{'margin': 'auto'}}>
          <MuiThemeProvider>
            <React.Fragment>
              <AppBar title="Success" />
              <div className="mt-4">
                <h3>Thank You For Your Registration!</h3>
                <p>You will get an email with further instructions</p>
              </div> 

              <div className="mt-4 text-center">
                <a href="/login" class="btn btn-primary">Login</a>   
              </div> 

            </React.Fragment>
          </MuiThemeProvider>
          </div>
          <div className="offset-lg-3"></div>
        </div>
      </div>  
    );
  }
}

export default Success;