import React from "react";
import $ from 'jquery';
import '../../node_modules/nouislider/distribute/nouislider.css';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSearchProducts } from "../actions/projectTaskActions";
import InputRange from '../../node_modules/react-input-range/lib/js/input-range/input-range';
import "react-input-range/lib/css/index.css" 
import * as qs from 'query-string';
import SearchItem from "./ProjectTask/SearchItem";
import Pagination from "react-js-pagination";

class SearchProducts extends React.Component {
  constructor(props) {
    super(props); 
    if (localStorage.getItem("searchbrands") === null) {
      let arr = [];
      arr.push("checkbox");
      localStorage.setItem("searchbrands",JSON.stringify(arr))
    }
    this.state = { 
      name: 'React',
      values: { min: localStorage.getItem('slideMin'), max: localStorage.getItem('slideMax') }, 
      searchTerm :"",
      SlideMin: "200", 
      SlideMax: "1000000",
      checkedbrands: JSON.parse(localStorage.getItem('searchbrands')),
      checkArr: [],
      activePage: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   }

  componentDidMount() {
    this.props.getSearchProducts();  
    const parsed = qs.parse(window.location.search);
    //console.log(parsed);
    this.props.getSearchProducts(this.state.searchTerm,this.state.SlideMin,this.state.SlideMax,this.state.activePage);
    Object.keys(parsed).map((item) => {
        if (item === "searchTerm") {
          let val = parsed[item];
          this.setState({searchTerm : val});  
          
        }else if (item === "SlideMin") {
            let val = parsed[item];
            this.setState({SlideMin : val});  
        
        }else if (item === "SlideMax") {
            let val = parsed[item];
            this.setState({SlideMax : val});  
         
        }
      })
     
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
      localStorage.setItem("searchbrands", JSON.stringify(checkedbrands))
    }
 }
 
  checkIt(BrandList) {
    //alert("checkbox"); 
      
    this.state.checkArr = JSON.parse(localStorage.getItem('searchbrands')); 
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

   //pagination

   handlePageChange = (pageNumber) => {
     this.setState({activePage: pageNumber});
     let currentUrl = new URLSearchParams(window.location.search);
     currentUrl.set('page', pageNumber)
    // this.props.history.push(currentUrl.toString());
     this.props.history.push({
      pathname: '/search',
      search: `${currentUrl.toString()}`
    })
     console.log(currentUrl.toString());  
  }
   
  render() {
    const newProjectTask = {
      SlideMin: "2000",
      SlideMax: "1000000"
     }; 
    const { search_products } = this.props.search_products; 
    let maxPages;
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

                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-4 mb-3 d-none">
                      <input className="form-control" type="hidden" id="searchTerm"
                      name="searchTerm"
                      value={this.state.searchTerm}
                      onChange={this.onChange}
                      />
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
                     Object.keys(search_products).map((item, index) => {
                      if (item === 'brandlist') {
                        return search_products.brandlist.map((BrandList, index) =>
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
          {Object.keys(search_products).map((item, index) => {
           // console.log(item)
            if (item === "title") {
               return ( 
                  <h4 className="titlename mt-2 ml-2">
                  {search_products.title}&nbsp;&nbsp;&nbsp;<i className="fas fa-angle-double-right"></i>
				          </h4>
                );
            }else{
              return ""
            }
          })}
          </div>
            
          {Object.keys(search_products).map((item, index) => {
                if (item === "searchResult") {
                  return search_products.searchResult.map((all, index) => {
                    return (
                        <SearchItem
                          key={index}
                          SearchItem={all}
                        />
                      );
                     
                  });
                }else{
                  return ""
                }
              })}
              
        </div>
       
        </div>
        {/* pagination start*/ }

        {Object.keys(search_products).map((item, index) => {
          if (item === "total") {
            maxPages = search_products[item];
            console.log(maxPages);
          } 
          })}

        <div class="row" id="paginrow">
      	  <div class="offset-lg-3"></div>
	          <div class="col-lg-6" style={{'margin': 'auto'}}>
             <Pagination
                activePage={this.state.activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={2}
                totalItemsCount={maxPages}
                onChange={this.handlePageChange}
              />
             </div>   
          <div class="offset-lg-3"></div>
        </div>      
        {/* pagination end*/ }
      
    </div>
    

      );
  }
}

SearchProducts.propTypes = {
    getSearchProducts: PropTypes.func.isRequired,
    search_products: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    search_products: state.project_task
  });
  
  export default connect(
    mapStateToProps,
    { getSearchProducts }
  )(SearchProducts); 