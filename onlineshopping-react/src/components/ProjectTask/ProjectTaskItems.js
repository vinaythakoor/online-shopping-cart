import React from "react";

class ProjectTaskItems extends React.Component {
  render() {
    const { c } = this.props;
    return (
  
      <div className="col-lg-2 col-md-6 mb-4 hover01">
      <a href="" className="tNone" style={{'text-decoration': 'none'}}>
          <div className="card h-100 border-0">      
          <img className="zoom card-img-top mt-2 teleHeight" src={`../img/${c.code}.jpg`}/>
              <div className="card-body text-center">
                  <h5 className="titlename text-truncate">{c.name}</h5>
                  <div className="caption">
                      <h5 className="pull-right productprice">&#8377; {c.unitPrice}</h5>
                   </div>
              </div>
          </div>
      </a>
   </div>

      );
  }
}

export default ProjectTaskItems;
