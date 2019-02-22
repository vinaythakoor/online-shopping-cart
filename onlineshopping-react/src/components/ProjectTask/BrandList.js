import React, { Component } from "react";

class BrandList extends React.Component {
  render() {
    const { BrandList } = this.props;
    return (
  
						 		<div className="custom-control custom-checkbox ml-2">
									<input type="checkbox" className="custom-control-input checksave"
										id={`${BrandList}`} name="brand[]" value={`${BrandList}`}
										onclick="toggleCheckbox(this)" autocomplete="off"/> <label
										className="custom-control-label brandname" for={`${BrandList}`}>{BrandList}</label>
								</div>
	     );
  }
}

export default BrandList;
