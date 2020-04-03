import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../redux/actions/Category";
import { patchProduct } from "../redux/actions/Product";
const url = process.env.REACT_APP_URL;
class Editproduct extends Component {
  state = {
    id: 0,
    name: "",
    category: 0,
    image: "",
    price: "",
    stock: "",
    description: "",
    imageText: ""
  };
  getCategories() {
    this.props.dispatch(getCategories());
  }
  componentDidMount() {
    this.getCategories();
  }

  componentWillReceiveProps({ data }) {
    this.onSetValue(data);
  }

  onSetValue = data => {
    this.setState({
      name: data.name,
      description: data.description,
      stock: data.stock,
      price: data.price,
      id: data.id
    });

    this.props.categories.forEach(category =>{
      if(category.name === data.category){
        this.setState({category: category.id})
      }
    })
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleFileChange = e => {
    const image = e.target.files[0];
    if (image.size > 1024 * 1024 * 5)
      return alert("Not allowed upload more than 5MB");
    const imageArr = image.name.split(".");
    const imageExt = imageArr[imageArr.length - 1].toLowerCase();
    if (
      imageExt !== "png" &&
      imageExt !== "jpg" &&
      imageExt !== "jpeg" &&
      imageExt !== "gif"
    )
      return alert("Not allowed upload another file except image");

    this.setState({
      image: image,
      imageText: e.target.value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", this.state.name);
    data.append("image", this.state.image);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
    data.append("description", this.state.description);
    data.append("category", this.state.category);

    if (this.state.image === "") {
      data.delete("image");
    }

    this.props.dispatch(patchProduct(data, this.state.id));
  };

  render() {
    return (
      <div
        className="modal fade"
        id="edit-product"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Edit Menu
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form encType="multipart/form-data">
                <div className="input-group mb-3">
                  <input
                    value={this.state.name}
                    required
                    className="form-control"
                    type="text"
                    name="name"
                    onChange={this.onChangeHandler}
                  ></input>
                  <div className="input-group-append">
                    <span className="input-group-text">Name</span>
                  </div>
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <img
                    src={url + this.props.data.image}
                    alt="..."
                    style={{ height: "80px", width: "150px" }}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    style={{ border: "none" }}
                    value={this.state.imageText}
                    className="form-control"
                    type="file"
                    onChange={this.handleFileChange}
                  ></input>
                  <div className="input-group-append">
                    <span className="input-group-text">Change Image</span>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="form-control"
                    value={this.state.category}
                    required
                    name="category"
                    onChange={this.onChangeHandler}
                  >
                    {this.props.categories.map((category, index) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      Rp.
                    </span>
                  </div>
                  <input
                    required
                    value={this.state.price}
                    className="form-control"
                    type="number"
                    name="price"
                    onChange={this.onChangeHandler}
                  ></input>
                  <div className="input-group-append">
                    <span className="input-group-text">Price</span>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    value={this.state.stock}
                    required
                    className="form-control"
                    type="number"
                    name="stock"
                    onChange={this.onChangeHandler}
                  ></input>
                  <div className="input-group-append">
                    <span className="input-group-text">Stock</span>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <textarea
                    value={this.state.description}
                    className="form-control"
                    type="number"
                    name="description"
                    onChange={this.onChangeHandler}
                  ></textarea>
                  <div className="input-group-append">
                    <span className="input-group-text">Description</span>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={this.onSubmitHandler}
                  data-dismiss="modal"
                  className="btn btn-primary"
                >
                  Send &raquo;
                </button>
                <button
                  type="reset"
                  className="btn btn-danger"
                  style={{ float: "right" }}
                  data-dismiss="modal"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapCategories = state => {
  return {
    categories: state.categories.categories
  };
};

export default connect(mapCategories)(Editproduct);
