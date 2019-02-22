import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userinfo } from "../../actions/projectTaskActions";
import { Link } from "react-router-dom";
import { getCart } from "../../actions/projectTaskActions";

class Single extends React.Component {
   
  constructor(props) {
    super(props); 
  }
 
  AddHandler =(e) => {
    e.preventDefault();
    alert("hii")
    var id = this.props.match.params.pt_id;
    this.props.getCart(id, this.props.history); 
   }

  render() {
    const { single } = this.props;
    let role;
    let quantity = single.quantity
    const { user_info } = this.props.user_info;

    Object.keys(user_info).map((item) => {
      if (item === "role") {
        role = user_info[item];
       } 
    }) 


    return (
        <div>
         
        <div className="row">

          <div className="col-12">
            <nav aria-label="breadcrumb" >
              <ol className="breadcrumb" style={{'background-color': 'white'}}>
                <li className="breadcrumb-item"><a href="/" style={{"text-decoration":"none"}}>Home</a></li>
                <li className="breadcrumb-item"><a
                  href="/" style={{"text-decoration":"none"}}>Products</a></li>
                <li className="breadcrumb-item active">{single.name}</li>
              </ol>
            </nav>
          </div>
         </div>
 
        <div className="row" >
           <div className="col-12 col-sm-4">
            <img src={`/img/${single.code}.jpg`} className="img-fluid"
              style={{"margin":"auto"}}/>
 
              <div className="row text-center">

              <div className="col-lg-6">

                { role == 'USER' ? (
                 <div>
                  { quantity < 1 ? (
                    <a href="javascript:void(0)" className="btn btn-success disabled mt-4"><strike>
                    <span className="fas fa-cart-plus" style={{"font-size":"14px"}}></span> Add to Cart
                  </strike></a>

                  ):(
                    <Link to={`/cart/add/${single.id}/product`} onClick={e=>this.props.AddHandler(e)}
                    className="btn btn-success mt-4" style={{"font-size":"14px"}}> <span className="fas fa-cart-plus"></span>
                    Add to Cart
                  </Link>
                  )}
                  </div>    
                ) : (
                  <div></div>
                )}
                    
                { role == 'ADMIN' ? (
                  <a href={`/manage/${single.id}/product`}
                    className="btn btn-success mt-4" style={{"font-size":"14px"}}> <span className="far fa-edit"></span>
                    Edit
                  </a>
                 ):(
                   <div></div> 
                )}
                </div>
                <div className="col-lg-6">  
                   <a href="/"
                    className="btn btn-warning mt-4" style={{"font-size":"14px"}}> Continue Shopping</a>
                </div>
             </div>
          </div>


           <div className="col-12 col-sm-8">

            <h3 className="ml-4">{single.name}</h3>
            <hr />

            <h4 className="ml-4">
              Price: <strong> &#8377; {single.unitPrice} /-</strong>
            </h4>
            <hr />

            { quantity < 1 ? (
              <h6 className="mt-3 ml-4">
              Qty. Available: <span style={{"color":"red"}}>Out of Stock!</span>
            </h6>
             ): (
              <h6 className="mt-3 ml-4">Qty. Available: {single.quantity}
              </h6>
             )}
                 <hr/>
    
            <p className="mt-3 ml-4"> {single.description} </p>
             <hr/>

          </div>
        </div>
        </div>

    )
  }
}

Single.propTypes = {
  user_info: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user_info: state.project_task 
});

export default connect(
  mapStateToProps,
  { userinfo, getCart }
)(Single);
