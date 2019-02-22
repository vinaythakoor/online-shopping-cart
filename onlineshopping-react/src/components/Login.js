import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/projectTaskActions";
import classnames from "classnames";
import Cookies from 'js-cookie';
import cookie from 'react-cookies'

class Login extends Component {
  constructor() {
    super(); 
    this.state = {
        username: "",
        password: "",
       errors: {},
       _csrf : Cookies.get('XSRF-TOKEN'),
       token: cookie.load('XSRF-TOKEN')  
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newProjectTask = {
        email: this.state.username,
        password: this.state.password
     };
    // console.log(newProjectTask);
    //this.props.addProjectTask(newProjectTask, this.props.history);
    let csrf = localStorage.getItem("_csrf");
    this.props.login(this.state.username, this.state.password, csrf ,this.props.history);

    //login(newProjectTask)
  }
 
  render() {
    const { errors } = this.state;
     //const xsrfToken = getDOM().getCookie(_cookieName); 
    console.log(this.state._csrf);
    return (
      <div className="addProjectTask">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/" className="btn btn-light">
                Back to Board
              </Link>
              <h4 className="display-4 text-center">
                Add /Update Project Task
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    name="username"
                    value={this.state.username}
                    placeholder="username"
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
  
                <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="password"
                  name="_csrf"
                  value={this.state.token}
                  onChange={this.onChange}
                />
              </div>
                 
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
