import React from "react";
import $ from 'jquery';
import '../../node_modules/nouislider/distribute/nouislider.css';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategoryProducts } from "../actions/projectTaskActions";
import TelevisionAll from "./ProjectTask/TelevisionAll";
import InputRange from '../../node_modules/react-input-range/lib/js/input-range/input-range';
import "react-input-range/lib/css/index.css" 
  
class CategoryProducts extends React.Component {
  constructor() {
    super(); 
    
    this.state = { 
      name: 'React',
      values: { min: localStorage.getItem('slideMin'), max: localStorage.getItem('slideMax') }, 
      SlideMin: JSON.parse(localStorage.getItem('slideMin')), 
      SlideMax: JSON.parse(localStorage.getItem('slideMax')),
      checkedbrands: JSON.parse(localStorage.getItem('brands')),
      checkArr: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   }

  componentDidMount() {
    this.props.getCategoryProducts();
    const items = {...localStorage};
    this.setState({
      items,
    })

    $('#SlideMin').val(localStorage.getItem('slideMin'));
    $('#SlideMax').val(localStorage.getItem('slideMax')); 
    
    //checkedbox
    
   $('.checksave').change(function() {
    console.log("hellloooo")
  });

    // reset
    $("#reset").click(function() {
      localStorage.setItem('slideMin', '2000');
      localStorage.setItem('slideMax', '1000000');
      $('#SlideMin').val(localStorage.getItem('slideMin'));
      $('#SlideMax').val(localStorage.getItem('slideMax')); 
      var button = document.getElementById('submitslider');
      button.form.submit();   
    });

    const newProjectTask = {
      SlideMin: "2000",
      SlideMax: "1000000"
     };
     
     this.props.getCategoryProducts("2",newProjectTask);
  } 
  
  toggleCheckboxChange = (e) => {
    //e.preventDefault()
    if (e.target.type === 'checkbox') {
      let { checkedbrands } = this.state;     
      var checkkey = e.target.id;
      var checkvalue = e.target.checked;
      if(checkvalue){
        checkedbrands = [...checkedbrands, checkkey];
       }else{
        checkedbrands = checkedbrands.filter(el => el !== checkkey);
       }

      this.setState({ checkedbrands }, () => console.log(this.state)); 
      localStorage.setItem("brands", JSON.stringify(checkedbrands))
    }
 }

 setcheckIt(BrandList) {

 }
 checkIt(BrandList) {
  //alert("checkbox"); 
    if (localStorage.getItem("brands") === null) {
      let arr = [];
      arr.push("checkbox");
      localStorage.setItem("brands",JSON.stringify(arr))
     }
  this.state.checkArr = JSON.parse(localStorage.getItem('brands')); 
  if(this.state.checkArr!=null && this.state.checkArr.some((item) => item == BrandList)){
    return true
  }else{
    return false
  }
}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
   }
 
   onSubmit() {
     const newProjectTask = {
      SlideMin: localStorage.getItem('slideMin'), 
      SlideMax: localStorage.getItem('slideMax')
     };
    //console.log(newProjectTask);
    this.props.getCategoryProducts("2",newProjectTask);
         //console.log(addProjectTask);
  }
    
   onChangeComplete(values){
    this.setState({
      values: values,
    });
   }
  
   onco(values){
    let sliderVal= [];
    Object.values(values).map((val) => {
      sliderVal.push(val)
      return ""
    })
    var min = Math.floor(sliderVal[0]); 
    var max = Math.floor(sliderVal[1]);
    localStorage.setItem('slideMin', JSON.stringify(min));
    localStorage.setItem('slideMax', JSON.stringify(max));
    $('#SlideMin').val(localStorage.getItem('slideMin'));
    $('#SlideMax').val(localStorage.getItem('slideMax')); 
    //console.log(values);
    var button = document.getElementById('submitslider');
		button.form.submit(); 
     
   }
   
  render() {
     
    const { catagory_products } = this.props.catagory_products;
     
    let value;
   return (
   
      <div className="container-fluid">
    
      <div className="row mt-3 mr-1 no-gutter">
    
        <div className="col-6 col-sm-4 col-md-3 col-lg-3 mt-3">
      
        <div className="card h-100">
    
            <h4 className=" ml-2 mt-2">Filters</h4> 
            <hr/>
            <h5 className=" ml-2 mt-2">Price Range</h5>
            <hr/>
           
            <p id="demo"></p> 
    
            <form className="form-group" action="" id="sliderForm">
  
            <div className="row card-body text-center">
                  
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
              <InputRange
              maxValue={1000000}
              minValue={200}
              value={this.state.values}
              onChange={this.onChangeComplete.bind(this)} 
              onChangeComplete={value => this.onco(value)}/>
               </div>
                
                 <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-4 mb-3">
                  <input className="form-control" type="text" id="SlideMin"
                    name="SlideMin"
                    value={this.state.SlideMin}
                    onChange={this.onChange}
                    />
                </div>
 
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-4 mb-3">
                  <input className="form-control" type="text" id="SlideMax"
                    name="SlideMax" 
                    value={this.state.SlideMax}
                    onChange={this.onChange}
                    />
    
                </div>
    
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <button type="button" className="btn btn-primary btn-sm" id="reset"
                      value="Reset">clear</button>
                </div>
    
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-2 d-none">
                  <button className="btn btn-secondary d-none" name="submitslider"
                    id="submitslider" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
    
              </div>
              <hr/> 
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="card-body">
                 <h5 className="ml-2">Brand</h5>
 
                  {
                     Object.keys(catagory_products).map((item, index) => {
                      if (item === 'brandlist') {
                        return catagory_products.brandlist.map((BrandList, index) =>
                        // console.log(BrandList)
                         (  
                              <div className="custom-control custom-checkbox ml-2">
                                    <input type="checkbox" className="custom-control-input checksave"
                                      id={BrandList} name="brand[]" value={`${BrandList}`}
                                      onChange={this.toggleCheckboxChange} autocomplete="off"
                                      defaultChecked={this.checkIt(BrandList)} 
                                       /> <label
                                      className="custom-control-label brandname" for={`${BrandList}`}>{BrandList}</label>
                                  </div>
                          ),
                           
                        );
                      }else{
                        return ""
                      }
                    })
                  } 
                </div>
              </div>
              <hr/>
              </form>
          </div>
        </div>
         
        <div className="col-4 col-sm-4 col-md-3 col-lg-9 mt-3">
    
          <div className="row mt-5 mx-auto bg-white rounded">
          {Object.keys(catagory_products).map((item, index) => {
           // console.log(item)
            if (item === "title") {
               return ( 
                  <h4 className="titlename mt-2 ml-2">
                  {catagory_products.title}&nbsp;&nbsp;&nbsp;<i className="fas fa-angle-double-right"></i>
				          </h4>
                );
            }else{
              return ""
            }
          })}
          </div>
            
          {Object.keys(catagory_products).map((item, index) => {
                if (item === "viewproducts") {
                  return catagory_products.viewproducts.map((all, index) => {
                    return (
                        <TelevisionAll
                          key={index}
                          television={all}
                        />
                      );
                     
                  });
                }else{
                  return ""
                }
              })}
              
        </div>
      </div>
    
    </div>
    

      );
  }
}

CategoryProducts.propTypes = {
    getCategoryProducts: PropTypes.func.isRequired,
    catagory_products: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
handleCheckboxChange: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    catagory_products: state.project_task
  });
  
  export default connect(
    mapStateToProps,
    { getCategoryProducts }
  )(CategoryProducts); 