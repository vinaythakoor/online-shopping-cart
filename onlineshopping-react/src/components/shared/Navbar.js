import React from "react";
import * as qs from 'query-string';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/projectTaskActions";
import { userinfo } from "../../actions/projectTaskActions";
import { userdetails } from "../Home";

class Navbar extends React.Component {
  
  constructor(props) {
    super(props); 
     this.state = { 
       searchTerm :"",
       autherization:"",
       fullname:"",
       grandtotal:""
      };
    this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
    const parsed = qs.parse(window.location.search);
     console.log(parsed);
     this.props.userinfo();      
     
     Object.keys(parsed).map((item) => {
      if (item === "searchTerm") {
        let val = parsed[item];
        this.setState({searchTerm : val});  
        //console.log(parsed[item])
       }
    })
 
    }

    //userdetail
   
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
     }
  
     logoutHandler =(e) => {
      e.preventDefault();
      this.props.logout(this.props.history);
  }

render() {
    
  localStorage.setItem("searchTerm", this.state.searchTerm)
  //this.setState({autherization : localStorage.getItem("Autherization")});
  const isLoggedIn =  JSON.parse(localStorage.getItem("Autherization"));
  let button;

  //userinfo
  const { user_info } = this.props.user_info;
  let fullname; 
  let grandtotal;
  let role;     
  Object.keys(user_info).map((item) => {
             if (item === "fullname") {
                fullname = user_info[item];
              } 
           })

  Object.keys(user_info).map((item) => {
            if (item === "role") {
              role = user_info[item];
             } 
          })       
console.log(role)
    Object.keys(user_info).map((cart) => {
            if (cart == "cart") {
              Object.keys(user_info[cart]).map((grandTotal) => {
                if(grandTotal=="grandTotal"){
                  grandtotal = user_info[cart][grandTotal];
                } 
               })
              } 
          })
    
  return (
  <div className="container-fluid">
  <nav className="navbar navbar-expand-lg my-nav">
    <div className="container">
      <a className="navbar-brand" href="/">
        online shopping
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" id="about">
            <div className="dropdown">
              <a href="/" className="nav-link" type="link" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="false" aria-expanded="false">
                Category
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a href="/show/category/products" className="list-group-item" id="">
                  category
                </a>
              </div>
            </div>
          </li>

          <li className="nav-item" id="about">
            <a className="nav-link" href="/about">
              About
            </a>
          </li>

          <li className="nav-item" id="list">
            <a className="nav-link" href="/list">
              list
            </a>
          </li>

          <li className="nav-item" id="contact">
            <a className="nav-link" href="/contact">
              Contact
            </a>
          </li>

          <li className="nav-item" id="listproducts">
            <a className="nav-link" href="/show/all/products">
              View products
            </a>
          </li>

          { role == 'ADMIN' ? (
            <li className="nav-item" id="manageProduct">
              <a className="nav-link" href="/manage/product">
                Manage Product
              </a>
            </li>
          ) : (
            <div></div>
          )}
 
        </ul>

        <ul className="navbar-nav ml-auto">
          
          {button}

          { isLoggedIn ? (
          <li className="dropdown" id="userModel">
            <a className="btn btn-outline-light dropdown-toggle" href="/" id="dropdownMenu1"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              {fullname}<span className="caret" />
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            
              { role == 'USER' ? (
                <li id="cart">
                  <a className="dropdown-item" href="/cart/show">
                  {" "}
                  <span className="fas fa-cart-plus" />&#160;
                  <span className="badge"></span>
                  &#8377; 
                  {grandtotal}
                  </a>
                </li>
                ) : (
                <div></div>
              )}

               <li role="separator" className="divider" />

              <li id="logout">
                <a className="dropdown-item" onClick={e=>this.logoutHandler(e)} href="/logout">
                  Logout
                </a>
              </li>
            </ul>

          </li>            
          ) : (
            <ul className="navbar-nav">
            <li className="nav-item" id="signup">
            <a className="nav-link" href="/membership">
              Sign Up
            </a>
             </li>
             <li className="nav-item" id="login">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li> 
          </ul> 
            )}
   
          </ul>

      </div>
    </div>
  </nav>

  <nav className="navbar navbar-expand-lg my-nav " style={{'background': '#1b1c1b'}}>

  <div className="offset-2 offset-sm-2 offset-md-2 offset-lg-2"></div>

  <div className="col-12 col-md-8 col-lg-8">
    <div className="main" style={{'width': '100%'}}>
      
    <form action="/search" id="searchForm">
      <div className="input-group">
          <input type="text" className="form-control" placeholder="Search"
            aria-label="Search" name="searchTerm" id="searchTerm"
            value={this.state.searchTerm}
            onChange={this.onChange}
            autocomplete="off"/> 
             
          <input id="search_ID" type="hidden" className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"/>

          <div className="input-group-append">
            <button className="btn btn-secondary" type="submit" id="submitsearch"
              value="Search" disabled={!this.state.searchTerm} onsubmit="validateForm()">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div className="offset-2 offset-sm-2 offset-md-2 offset-lg-2"></div>
</nav>

</div>

);
}}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  project_tasks: PropTypes.object.isRequired,
  user_info: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  project_tasks: state.project_task,
  user_info: state.project_task 
});

export default connect(
  mapStateToProps,
  { logout, userinfo }
)(Navbar);
