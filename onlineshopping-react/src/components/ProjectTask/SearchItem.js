import React from "react";

class SearchItem extends React.Component {
  render() {
    const { SearchItem } = this.props;
    return (
      
        <div className="row mt-5 mx-auto bg-white rounded">
            <div className="col-4 col-lg-4 col-md-4 border-bottom">
            <a href="/" style={{'text-decoration': 'none'}}>
                <div className="card h-100 border-0">
                <img className="img-fluid mt-4" src={`/img/${SearchItem.code}.jpg`} alt="" style={{'margin': 'auto'}}/>
                    <div className="card-body text-center">
                    <div className="caption">
                        <h5 className="pull-right productprice font-weight-bold">&#8377;
                        {SearchItem.unit_price}</h5> 
                    </div>
                </div>
            </div>
        </a>
    </div>

    <div className="col-8 col-lg-8 col-md-8 border-bottom">
        <a href="/" style={{'text-decoration': 'none'}}>
             <div className="card h-100 border-0">
                <div className="card-body">
                    <h5 className="productname">{SearchItem.name}</h5>
                    <div className="caption">
                        <h5 className="pull-right productprice ml-2">
                            {SearchItem.description}</h5>
                    </div>
                </div>
            </div>
        </a>
        <hr/>
        </div>
    </div>
    );
  }
}

export default SearchItem;
