import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from 'jquery';
import { updateCart } from "../../actions/projectTaskActions";
import { removeCart } from "../../actions/projectTaskActions";

class Cartproduct extends React.Component {
    constructor(props) {
        super(props);
        let cart =  this.props.cart;
        this.state = {
            cartId: cart.id,
            cartProductCount: cart.productCount 
    };
    this.onChange = this.onChange.bind(this);
    this.onClickRefresh = this.onClickRefresh.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    console.log(this.state.cartProductCount);
    }
 
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickRefresh(e) { 
        if(e.target.value === 1 || e.target.value === 2 || e.target.value === 3){
            let cart =  this.props.cart;
            this.props.updateCart(cart.id, this.state.cartProductCount);
            window.location.reload();
        }else{
            
            let count = this.props.cart.productCount;
            console.log(this.state.cartProductCount);
            $(`#count_${this.state.cartId}`).val(`${count}`)
        }
    }
    
    onClickRemove(e){
        let cart =  this.props.cart;
        this.props.removeCart(cart.id);
        window.location.reload();
     }

    render() {
    const { cart } = this.props;
   
    return (
         
        <tr>
        <td data-th="Product">
            <div class="row mt-2 mb-3">
                <div class="col-sm-3 hidden-xs">
                    <img src={`/img/${cart.product.code}.jpg`}
                        alt={cart.product.code}
                        class="img-fluid dataTableImg" />
                </div>
                <div class="col-sm-9">
                    <h4 class="nomargin">{cart.product.name}
                    { cart.available == 'false' ? (
                        <strong style={{"color": "red"}}>(Not Available)</strong>
                       ):(
                         <div></div>
                    )}
 
                    </h4>
                    <p>Brand : {cart.product.brand} </p>
                      
                </div>
            </div>
        </td>
        <td data-th="Price">&#8377; {cart.buyingPrice} /-</td>
        <td data-th="Quantity">
  
                <input
                    className="text-center"
                    type="number"
                    id= {`count_${cart.id}`}
                    name="cartProductCount"
                    value={this.state.cartProductCount}
                    onChange={this.onChange}
                    min="1" max="3"
                  />
        </td>
        <td data-th="Subtotal" class="text-center">&#8377;
            {cart.total} /-</td>
        <td class="actions" data-th="">

        { cart.available == true ? (
            <button type="button" name="refreshCart"
                class="btn btn-info btn-sm mr-2" value={cart.id} onClick={this.onClickRefresh}>
                <span class="fas fa-sync-alt"></span>
            </button>
          ):(
             <div></div>
        )}
             <button type="button" name="removeItem"
                class="btn btn-danger btn-sm" value={cart.id} onClick={this.onClickRemove}>
                <span class="fas fa-trash"></span>
            </button>    
            </td>
        </tr>
    );
  }
}

Cartproduct.propTypes = {
    updateCart: PropTypes.func.isRequired,
    removeCart: PropTypes.func.isRequired,
    cart_products: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    cart_products: state.project_task
  });
  
  export default connect(
    mapStateToProps,
    { updateCart, removeCart }
  )(Cartproduct);
   