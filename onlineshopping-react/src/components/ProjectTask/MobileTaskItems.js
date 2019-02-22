import React from "react";

class MobileTaskItems extends React.Component {
  render() {
    const { mobile } = this.props;
    return (
        <div className="col-lg-2 col-md-6 mb-4 hover01">
        <a href="/" className="tNone" style={{'text-decoration': 'none'}}>
            <div className="card h-100 border-0">      
            <img className="zoom card-img-top mt-2 mobileHeight" src={`../img/${mobile.code}.jpg`} alt=""/>
                <div className="card-body text-center">
                    <h5 className="titlename text-truncate">{mobile.name}</h5>
                    <div className="caption">
                        <h5 className="pull-right productprice">&#8377; {mobile.unitPrice}</h5>
                     </div>
                </div>
            </div>
        </a>
     </div>

      );
  }
}

export default MobileTaskItems;
