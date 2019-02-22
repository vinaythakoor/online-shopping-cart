import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Addproduct from './management/Addproduct';
import { productUpload } from "../actions/projectTaskActions";
import { getcategories } from "../actions/projectTaskActions";

class ManageProduct extends Component {
  
    constructor(props) {
        super(props); 
        
        this.state = { 
            id:'',
            name: '', nameError: "",
            brand: '', brandError: "",
            description: '',descriptionError: "",
            unitPrice: '',unitPriceError: "",
            quantity: '',quantityError: "",
            file: '', file1: '', fileError: "" , 
            categoryId:'', categoryIdError: '',  
            categoryName: '', categoryName: '',
            code:'',
            supplierId:'',
            active: true,  
            select: false,
            addressId: ''
         }; 
         this.handleUpload = this.handleUpload.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    componentDidMount() {
        this.props.getcategories();
 	}
        handleUpload = e => {
            console.log(e.target.files[0])
            this.setState({ file: e.target.files[0] });

            let files = e.target.files;
            let reader =new FileReader();
            reader.readAsDataURL(files[0]);
            
            reader.onload = (e) => {
                //console.log(e.target.result)
           //     this.setState({ file: e.target.files[0] });
               // this.setState({ file1: e.target.files });    
            }
        }
  
        // Handle fields change
        handleChange = input => e => {
            this.setState({ [input]: e.target.value });
        };
    
        handleSubmit = e => {
           // alert('submit')
           let uploadproduct = {
                name: this.state.name,
                brand: this.state.brand,
                description: this.state.description,
                unitPrice: this.state.unitPrice,
                quantity: this.state.quantity,
                //file: this.state.file, 
                categoryId: this.state.categoryName, 
                supplierId: 1,
                active: this.state.active,  
             }
             
             let data = JSON.stringify(uploadproduct)
             const form = new FormData();
             form.append('name',this.state.name)
             form.append('brand',this.state.brand)
             form.append('description',this.state.description)
             form.append('unitPrice',this.state.unitPrice)
             form.append('quantity',this.state.quantity)
             form.append('categoryId',this.state.categoryId)
             form.append('supplierId',this.state.supplierId)
             form.append('active',this.state.active)
  
             const formData = new FormData();
             formData.append('data',data)
             formData.append('file',this.state.file)
 
             this.props.productUpload( formData )
        }

    render() {
        const { product_categories } = this.props.product_categories; 
        const {  name, brand, description, unitPrice,
            quantity, file, categoryId, categoryName,
            nameError, brandError, descriptionError, unitPriceError, fileError,categoryIdError,
            quantityError, categoryNameError
        } = this.state;
        
        const values = { name, brand, description, unitPrice,
            quantity, file, categoryId, categoryName,
            nameError, brandError, descriptionError, unitPriceError, fileError,categoryIdError,
            quantityError, categoryNameError
             };
              
    return ( 
 
        <div class="container">
        
            <Addproduct
            handleChange={this.handleChange}
            handleUpload={this.handleUpload}
            handleSubmit={this.handleSubmit}
            values={values}
            categories={product_categories}
            />
        
             <div class="modal fade" id="myCategoryModal" tabindex="-1"
                role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add New Category</h5>
                            <button type="button" class="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
         
                        </div>
                    </div>
                </div>
            </div>
        
            <hr />
            <h1>Available Products</h1>
            <hr />
        
            <div class="row">
                <div class='col-12'>
                    <div class="table-responsive">
                        <table id="productsTable" class="table table-striped table-bordered">
        
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>&#160;</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Qty. Avail</th>
                                    <th>Unit Price</th>
                                    <th>Activate</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
        
                            <tfoot>
                                <tr>
                                    <th>Id</th>
                                    <th>&#160;</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Qty. Avail</th>
                                    <th>Unit Price</th>
                                    <th>Activate</th>
                                    <th>Edit</th>
                                </tr>
                            </tfoot>
        
        
                        </table>
                    </div>
        
                </div>
        
        
            </div>
         
        </div>
    )
  }
}

ManageProduct.propTypes = {
    productUpload: PropTypes.func.isRequired,
    getcategories: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    errors: state.errors,
    product_categories: state.project_task
  });
  
  export default connect(
    mapStateToProps,
    { productUpload, getcategories }
  )(ManageProduct);
 