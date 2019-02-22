import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../actions/projectTaskActions";
import MobileTaskItems from "./ProjectTask/MobileTaskItems";
import TelevisionTaskItems from "./ProjectTask/TelevisionTaskItems";
import LaptopTaskItems from "./ProjectTask/LaptopTaskItems";

class ProjectBoard extends Component {
  componentDidMount() {
    this.props.getBacklog();
  }
  render() {
    const { project_tasks } = this.props.project_tasks;
    let BoardContent;
    let mobile = [];
    let doneItems = [];

    const BoardAlgorithm = project_tasks => {
      if (project_tasks.length > 1) {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project Tasks on this board
          </div>
        );
      } else {
        return (
          <React.Fragment>
                  <div className="row">
          <div className="col-lg-12">
            <div className="row mb-4">
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
                  <li data-target="#carouselExampleIndicators" data-slide-to="1" />
                  <li data-target="#carouselExampleIndicators" data-slide-to="2" />
                  <li data-target="#carouselExampleIndicators" data-slide-to="3" />
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img className="d-block img-fluid" src={"../img/iphone.jpg"} alt="" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src={"../img/mitv.jpg"} alt="" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src={"../img/sony.jpg"} alt="" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src={"../img/nokia.jpg"} alt="" />
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  {" "}
                  <span className="carousel-control-prev-icon" aria-hidden="true" />{" "}
                  <span className="sr-only">Previous</span>
                </a>{" "}
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  {" "}
                  <span className="carousel-control-next-icon" aria-hidden="true" />{" "}
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>

            {/* Laptop start */}

            <div class="row mt-5 bg-white rounded"> 
              <div class="col-2 mt-2 bg-white rounded">
                <Link to="/category/1/products/mmm" className="btn btn-primary mb-3">                  
                  <h5 class="categoryname mt-2 ml-2">
                    Laptops bbbb&nbsp;&nbsp;&nbsp; 
                    <i class="fas fa-angle-double-right" />
                  </h5>
                 </Link>

              </div>
            </div>

            <div className="row">
              {Object.keys(project_tasks).map((item, index) => {
                if (item == "viewproducts1") {
                  return project_tasks.viewproducts1.map((laptop, index) => {
                    return (
                        <LaptopTaskItems
                          key={index}
                          laptop={laptop}
                        />
                      );
                     
                  });
                }
              })}
            </div>

            {/* Television start*/}

            <div class="row mt-5 bg-white rounded">
              <div class="col-2 mt-2 bg-white rounded">
                <a href="${contextRoot}/view/category/1/products">
                  <h5 class="categoryname mt-2 ml-2">
                    Televisions&nbsp;&nbsp;&nbsp;
                    <i class="fas fa-angle-double-right" />
                  </h5>
                </a>
              </div>
            </div>

            <div className="row">
              {Object.keys(project_tasks).map((item, index) => {
                if (item == "viewproducts2") {
                  return project_tasks.viewproducts2.map(
                    (television, index) => {
                      return (
                        <TelevisionTaskItems
                          key={index}
                          television={television}
                        />
                      );
                    }
                  );
                }
              })}
            </div>

            {/* Mobile start*/}

            <div class="row mt-5 bg-white rounded">
              <div class="col-2 mt-2 bg-white rounded">
                <a href="${contextRoot}/view/category/1/products">
                  <h5 class="categoryname mt-2 ml-2">
                    Mobiles&nbsp;&nbsp;&nbsp;
                    <i class="fas fa-angle-double-right" />
                  </h5>
                </a>
              </div>
            </div>

            <div className="row">
              {Object.keys(project_tasks).map((item, index) => {
                if (item == "viewproducts3") {
                  return project_tasks.viewproducts3.map((mobile, index) => {
                     return (
                      <MobileTaskItems
                        key={index}
                        mobile={mobile}
                      />
                    );
                   });
                }
              })}
            </div>
          </React.Fragment>
        );
      }
    };

    BoardContent = BoardAlgorithm(project_tasks);

    return (
      <div className="container-fluid">
        <mobileItems />
        {BoardContent}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  project_tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project_tasks: state.project_task
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(ProjectBoard);
