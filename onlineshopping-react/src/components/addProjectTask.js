// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { addProjectTask } from "../actions/projectTaskActions";
// import classnames from "classnames";

// class AddProjectTask extends Component {
//   constructor() {
//     super();
//     this.state = {
//       searchTerm: "",
//        errors: {}
//     };
//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }

//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     const newProjectTask = {
//       searchTerm: this.state.searchTerm 
//     };
//     // console.log(newProjectTask);
//     this.props.addProjectTask(newProjectTask, this.props.history);
//   }

//   render() {
//     const { errors } = this.state;
//     return (
//       <div className="addProjectTask">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <Link to="/" className="btn btn-light">
//                 Back to Board
//               </Link>
//               <h4 className="display-4 text-center">
//                 Add /Update Project Task
//               </h4>
//               <form onSubmit={this.onSubmit}>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     className={classnames("form-control form-control-lg", {
//                       "is-invalid": errors.searchTerm
//                     })}
//                     name="searchTerm"
//                     value={this.state.searchTerm}
//                     placeholder="Project Task summary"
//                     onChange={this.onChange}
//                   />
//                   {errors.searchTerm && (
//                     <div className="invalid-feedback">{errors.searchTerm}</div>
//                   )}
//                 </div>
                  
//                 <input
//                   type="submit"
//                   className="btn btn-primary btn-block mt-4"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// AddProjectTask.propTypes = {
//   addProjectTask: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { addProjectTask }
// )(AddProjectTask);
