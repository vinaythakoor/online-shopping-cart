import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
}  from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
 
class Addproduct extends Component {

    state = {
        labelWidth: 0,
        age: '',
      };

      componentDidMount() {
        this.setState({
          //labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }
  
    render() {
        const { categories, values, handleChange, handleUpload, handleSubmit} = this.props;
        console.log(categories)
         
        Object.keys(categories).map((item, index) => {
          console.log(categories[item])
            Object.keys(categories[item]).map((it, index) => {
              console.log(categories[item][it].name)
            })  
        })

        const muiTheme = getMuiTheme({
            fontFamily: 'Roboto, sans-serif',
           palette: {
             primary1Color: cyan500,
             primary2Color: cyan700,
             primary3Color: grey400,
             accent1Color: pinkA200,
             accent2Color: grey100,
             accent3Color: grey500,
             textColor: darkBlack,
             alternateTextColor: white,
             canvasColor: white,
             borderColor: grey300,
             disabledColor: fade(darkBlack, 0.3),
             pickerHeaderColor: cyan500,
             clockCircleColor: fade(darkBlack, 0.07),
             shadowColor: fullBlack,
            },
           appBar: {
             height: 50,
           },
         });
     
    return (
      <div>
        <div class="row">
            <div class="col-12 offset-md-2 col-md-8">
                <div class="alert alert-danger alert-dismissible"></div>
            </div>
        </div>

            <div class="row">

                <div class="offset-md-2 col-md-8">

                    <div class="card">

                        <div class="card-header">

                            <h4>Product Management</h4>

                        </div>

                        <div class="card-body">

                            <MuiThemeProvider  muiTheme={muiTheme}>
                            <React.Fragment>
                            <AppBar title="Enter Product Info" />
                            <TextField
                                hintText="Enter Your Product Name"
                                floatingLabelText="Product Name"
                                onChange={handleChange('name')}
                                errorText={values.nameError}
                                defaultValue={values.name}
                                fullWidth
                            />
                            <br />
                            <TextField
                                hintText="Enter Your brand Name"
                                floatingLabelText="brand"
                                onChange={handleChange('brand')}
                                defaultValue={values.brand}
                                errorText={values.brandError}
                                fullWidth
                            />
                            <br />
                            <TextField
                                hintText="Enter Product description"
                                floatingLabelText="description"
                                onChange={handleChange('description')}
                                defaultValue={values.description}
                                errorText={values.descriptionError}
                                fullWidth
                            />
                            <br />
                            <TextField
                                hintText="Enter Product Price"
                                floatingLabelText="unitPrice"
                                type="number"
                                id = "unitPrice"
                                onChange={handleChange('unitPrice')}
                                defaultValue={values.unitPrice}
                                errorText={values.unitPriceError}
                                fullWidth 
                            />
                            <br />
                            <TextField
                                hintText="Enter Product Quantity"
                                floatingLabelText="quantity"
                                onChange={handleChange('quantity')}
                                defaultValue={values.quantity}
                                errorText={values.quantityError}
                                type="number"
                                fullWidth
                            />
                            <br />
                              <RaisedButton
                                containerElement='label'> 
                                <input type="file" 
                                onChange={handleUpload}
                              />
                              </RaisedButton>
                            <br />
                            <br />
                             
                          <InputLabel htmlFor="categoryName-simple">Category : &nbsp;</InputLabel>
                          <Select
                            value={values.categoryName}
                            onChange={handleChange('categoryName')}
                            input={<Input name= "categoryName" id="categoryName-helper" />} 
                          > 
                            {Object.keys(categories).map((item, index) => {
                                console.log(categories[item])
                                return Object.keys(categories[item]).map((it, index) => {
                                    console.log(categories[item][it].name)
                                    let name = categories[item][it].name;
                                    let id = categories[item][it].id;
                                    return(
                                      <MenuItem value={id}>{name}</MenuItem>
                                    )
                                  })  
                              })} 
                           </Select> 
                            <br/>
                            <br/>
                            
                            <button type="button" class="btn btn-warning btn-xs float-right"
                              data-toggle="modal" data-target="#myCategoryModal">Add
                              New Category</button>
                              <br/>
                              <br/>
                            <div class="text-center">
                            <RaisedButton
                                label="Submit"
                                primary={true}
                                style={styles.button}
                                onClick={handleSubmit}
                            />
                            </div>
                            </React.Fragment>
                        </MuiThemeProvider>
          
                        </div>

                    </div>

                </div>

            </div>
 
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
             
                  <MuiThemeProvider  muiTheme={muiTheme}>
                    <React.Fragment>
                      <AppBar title="Add New Catagory" />
                      <TextField
                          hintText="Enter Catagory Name"
                          floatingLabelText="Catagory Name"
                          onChange={handleChange('categoryName')}
                          errorText={values.categoryNameError}
                          defaultValue={values.categoryName}
                          fullWidth
                      />
                      <br />

                      <TextField
                          hintText="Enter Catagory description"
                          floatingLabelText="Catagory description"
                          onChange={handleChange('categoryDescription')}
                          errorText={values.categoryDescriptionError}
                          defaultValue={values.categoryDescription}
                          multiline={true}
                          rows={4}
                          rowsMax={4} 
                          fullWidth
                      />
                      <br/>

                      <div class="text-center">
                          <RaisedButton
                          label="Continue"
                          primary={true}
                          style={styles.button}
                          onClick={this.continue}
                          />
                        </div>
                    </React.Fragment>
                  </MuiThemeProvider>
                   
                  </div>
                </div>
              </div>
          </div>
      </div>
    )
  }
}

const styles = {
    button: {
      margin: 15
    },
    root: {
      color: green[600],
      '&$checked': {
        color: green[500],
      },
    },
    checked: {},
  };

export default withStyles(styles)(Addproduct)