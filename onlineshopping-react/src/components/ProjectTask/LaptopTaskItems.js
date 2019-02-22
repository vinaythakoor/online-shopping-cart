import React from "react";
import PropTypes from "prop-types";
import { getSingleProduct } from "../../actions/projectTaskActions";

class LaptopTaskItems extends React.Component {
    constructor(props) {
        super(props); 
        }
  
        
    productHandler =(e) => {
        this.props.getSingleProduct("1");
    }
    
    render() {
    const { laptop } = this.props;
    
    return (
        <div className="col-lg-2 col-md-6 mb-4 hover01">
        <a href={`/show/${laptop.id}/product`} className="tNone" style={{'text-decoration': 'none'}}
            onClick={e=>this.productHandler(e)}>
            <div className="card h-100 border-0">      
            <img className="zoom card-img-top mt-2 teleHeight" src={`../img/${laptop.code}.jpg`} alt=""/>
                <div className="card-body text-center">
                    <h5 className="titlename text-truncate">{laptop.name}</h5>
                    <div className="caption">
                        <h5 className="pull-right productprice">&#8377; {laptop.unitPrice}</h5>
                     </div>
                </div>
            </div>
        </a>
     </div>
     
      );
  }
}

export default LaptopTaskItems;
