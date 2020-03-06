import React, { Component } from "react";
import "../Home.css";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/Category";

import Addcat from "../../modals/Addcategory";
import Deletecat from "../../modals/Deletecategory";
import Editcategory from "../../modals/Editcategory";

class Category extends Component {
  state = {
    id: "",
    data: []
  };
  getCategories() {
    this.props.dispatch(getCategories());
  }
  componentDidMount() {
    this.getCategories();
  }
  editData = data => {
    this.setState({
      data: data
    });
  };
  deleteData = id => {
    this.setState({
      id: id
    });
  };
  render() {
    return (
      <div hidden={this.props.categoryHidden}>
        <table className="table table-striped" name="table-category">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories.map((category, index) => (
              <tr key={index}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => this.editData(category)}
                    data-toggle="modal"
                    data-target="#edit-category"
                  >
                    Edit
                  </button>{" "}
                  -{" "}
                  <button
                    className="btn btn-outline-danger"
                    data-toggle="modal"
                    data-target="#delete-category"
                    onClick={() => this.deleteData(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Addcat />
        <Deletecat id={this.state.id} />
        <Editcategory data={this.state.data} />
      </div>
    );
  }
}

const mapCategories = state => {
  return {
    categories: state.categories.categories
  };
};

export default connect(mapCategories)(Category);
