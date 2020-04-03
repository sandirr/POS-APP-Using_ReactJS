import React, { Component } from "react";
import "../Home.css";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions/Product";
import { getCategories } from "../../redux/actions/Category";

import { Link, withRouter } from "react-router-dom";
import querystring from "query-string";

import Addproduct from "../../modals/Addproduct";
import Editproduct from "../../modals/Editproduct";
import Deleteproduct from "../../modals/Deleteproduct";
const url = process.env.REACT_APP_URL;
class Product extends Component {
  state = {
    data: [],
    id: "",

    activePage: 1,
    sort: "ASC",
    by: "id",
    searchName: "",
    activeCategory: ""
  };

  onClickMenu = async e => {
    await this.setState({ activeCategory: e });
    this.props.history.push(
      `/dash?name=${this.state.searchName}&category=${e}&sort=${this.state.sort}&by=${this.state.by}`
    );
    if (e === "") this.setState({ activeCategory: "" });
    const data = {
      activePage: 1,
      activeCategory: e,
      searchName: this.state.searchName,
      sort: this.state.sort,
      by: this.state.by
    };
    this.props.dispatch(getProducts(data));
    this.props.dispatch(getCategories());
  };

  onSort = async e => {
    await this.setState({ sort: e });
    this.props.history.push(
      `/dash?name=${this.state.searchName}&category=${this.state.activeCategory}&sort=${e}&by=${this.state.by}`
    );
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      searchName: this.state.searchName,
      sort: e,
      by: this.state.by
    };
    this.props.dispatch(getProducts(data));
  };

  onBy = async e => {
    await this.setState({ by: e });
    this.props.history.push(
      `/dash?name=${this.state.searchName}&category=${this.state.activeCategory}&sort=${this.state.sort}&by=${e}`
    );
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      searchName: this.state.searchName,
      sort: this.state.sort,
      by: e
    };
    this.props.dispatch(getProducts(data));
  };

  onChangeSearch = e => {
    this.setState({ searchName: e.target.value });
    this.props.history.push(
      `/dash/name=${e.target.value}&category=${this.state.activeCategory}&sort=${this.state.sort}&by=${this.state.by}`
    );
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      searchName: e.target.value,
      sort: this.state.sort,
      by: this.state.by
    };
    this.props.dispatch(getProducts(data));
  };

  changePage = async e => {
    await this.setState({ activePage: e });
    this.props.history.push(
      `/dash/name=${this.state.searchName}&category=${this.state.activeCategory}&sort=${this.state.sort}&by=${this.state.by}&page=${e}`
    );
    const data = {
      activePage: e,
      activeCategory: this.state.activeCategory,
      searchName: this.state.searchName,
      sort: this.state.sort,
      by: this.state.by
    };
    this.props.dispatch(getProducts(data));
  };

  getProducts() {
    var q = querystring.parse(this.props.location.search);
    var data;
    if (q) {
      data = {
        activePage: q.page,
        activeCategory: q.category,
        searchName: q.name,
        sort: q.sort,
        by: q.by
      };
    } else {
      data = {};
    }
    this.props.dispatch(getProducts(data));
  }

  deleteData = id => {
    this.setState({
      id: id
    });
  };

  editData = data => {
    this.setState({
      data: data
    });
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const PriceParsed = data => {
      return (
        <span>
          {data.data
            .toString()
            .split("")
            .reverse()
            .join("")
            .match(/\d{1,3}/g)
            .join(".")
            .split("")
            .reverse()
            .join("")}
        </span>
      );
    };
    return (
      <div hidden={this.props.productHidden}>
        <ul className="nav nav-product">
          <li className="nav-item">
            <Link
              to="#"
              className="nav-link"
              onClick={() => this.onClickMenu("")}
            >
              All
            </Link>
          </li>

          {this.props.categories.map((category, index) => (
            <li className="nav-item" key={index}>
              <Link
                to="#"
                className="nav-link"
                onClick={() => this.onClickMenu(category.name)}
              >
                {category.name}
              </Link>
            </li>
          ))}
          <li className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort
            </Link>
            <div className="dropdown-menu">
              <Link
                to="#"
                className="dropdown-item"
                id="ASC"
                onClick={() => this.onSort("ASC")}
              >
                Ascending
              </Link>
              <Link
                to="#"
                className="dropdown-item"
                id="DESC"
                onClick={() => this.onSort("DESC")}
              >
                Descending
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              By
            </Link>
            <div className="dropdown-menu">
              <Link
                to="#"
                className="dropdown-item"
                id="date_added"
                onClick={() => this.onBy("date_added")}
              >
                Date Added
              </Link>
              <Link
                to="#"
                className="dropdown-item"
                id="name"
                onClick={() => this.onBy("name")}
              >
                Name
              </Link>
              <Link
                to="#"
                className="dropdown-item"
                id="price"
                onClick={() => this.onBy("price")}
              >
                Price
              </Link>
            </div>
          </li>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              onChange={this.onChangeSearch}
            />
          </form>
        </ul>

        <table className="table table-dash table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, index) => (
              <tr key={index}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>
                  <img alt={product.description} src={url + product.image} />
                </td>
                <td>{product.category}</td>
                <td>
                  Rp. <PriceParsed data={product.price} />
                </td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => this.editData(product)}
                    data-toggle="modal"
                    data-target="#edit-product"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    data-toggle="modal"
                    data-target="#delete-product"
                    onClick={() => this.deleteData(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          aria-label="Page navigation example"
          style={{ position: "fixed", bottom: "7px", width: "75%" }}
        >
          <ul className="pagination justify-content-center">
            {this.props.pages.map(page => (
              <li
                className="page-item"
                key={page}
                id={page}
                onClick={() => this.changePage(page)}
              >
                <Link to="#" className="page-link">
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Addproduct />
        <Editproduct data={this.state.data} />
        <Deleteproduct id={this.state.id} />
      </div>
    );
  }
}

const mapProducts = state => {
  return {
    products: state.products.products,
    pages: state.products.pages,
    categories: state.categories.categories
  };
};

export default withRouter(connect(mapProducts)(Product));
