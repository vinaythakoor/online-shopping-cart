import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSingleProduct } from "../actions/projectTaskActions";
import { getCart } from "../actions/projectTaskActions";
import {withRouter} from 'react-router';
import Single from "./ProjectTask/Single";
 
class SingleProduct extends React.Component {
  constructor(props) {
    super(props); 
    }

  componentDidMount() {
    var id = this.props.match.params.pt_id;
    this.props.getSingleProduct(id); 
  }
  
  AddHandler =(e) => {
    //e.preventDefault();
    //alert("hii")
    var id = this.props.match.params.pt_id;
    this.props.getCart(id, this.props.history); 
  }

  render() { 
    const { single_product } = this.props.single_product;
    return (
       
      <div className="container">
        
      {Object.keys(single_product).map((single,index) => {
                if (single === "product") {
                 let item = single_product[single];
                    return(
                        //{single_product[item].name},
                        <Single
                         key={index}
                         single={item}
                         AddHandler={this.AddHandler}
                       />
                     )
                 } 
            })}
      </div>
      
      );
    }
  }

SingleProduct.propTypes = {
    getSingleProduct: PropTypes.func.isRequired,
    getCart:PropTypes.func.isRequired,
    single_product: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    single_product: state.project_task
  });
  
  export default connect(
    mapStateToProps,
    { getSingleProduct, getCart}
  )(SingleProduct); 
