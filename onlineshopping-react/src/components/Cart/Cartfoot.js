import React from "react";
import PropTypes from "prop-types";
 
class Cartfoot extends React.Component {
    constructor(props) {
        super(props); 
        }
    
            
    render() {
    const { cartinfo } = this.props;
    
    return (
        
        <div mb-3>
            <tr class="visible-xs">
                <td class="text-center"><strong>Total &#8377; {cartinfo.grandTotal}
                    </strong>
                </td>
            </tr>
            <tr>
                <td><a href="${contextRoot}/show/all/products"
                    class="btn btn-warning"><span
                        class="fas fa-chevron-left"></span> Continue
                        Shopping</a></td>
                <td colspan="2" class="hidden-xs"></td>
                <td class="hidden-xs text-center"><strong>Total &#8377; {cartinfo.grandTotal} /-</strong></td>

                    { cartinfo.availableCount != 0 ? (
                        <td><a href="/cart/validate"
                        class="btn btn-success btn-block">Checkout <span
                            class="fas fa-chevron-right"></span></a></td>

                        ):(
                            <td><a href="javascript:void(0)"
                            class="btn btn-success btn-block disabled"><strike>Checkout
                                    <span class="fas fa-chevron-right"></span>
                            </strike></a></td>
                    )}
    
                    </tr>
                </div>
    );
  }
} 

export default Cartfoot;
