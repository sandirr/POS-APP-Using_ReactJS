import React, { Component, Fragment } from "react";
import CardProduct from "../layout/CardProduct";
import "./Home.css";
import { connect } from "react-redux";
import { getProducts } from "../redux/actions/Product";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

class Products extends Component {
  state = {
    activePage: 1,
    sort: "ASC",
    by: "id",
    serachName: "",
    activeCategory: ""
  };

  getProducts() {
    const data = { user: "cashier" };
    this.props.dispatch(getProducts(data));
  }

  onClickMenu = e => {
    this.setState({ activeCategory: e.target.id });
    if (e.target.id === "") this.setState({ activeCategory: "" });
    const data = {
      activePage: 1,
      activeCategory: e.target.id,
      serachName: "",
      sort: this.state.sort,
      by: this.state.by,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
  };

  onSort = e => {
    this.setState({ sort: e.target.id });
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      serachName: "",
      sort: e.target.id,
      by: this.state.by,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
  };

  onBy = e => {
    this.setState({ by: e.target.id });
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      serachName: "",
      sort: this.state.sort,
      by: e.target.id,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
  };

  onChangeSearch = e => {
    this.setState({ serachName: e.target.value });
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      serachName: e.target.value,
      sort: this.state.sort,
      by: this.state.by,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
  };

  changePage = e => {
    this.setState({ activePage: e });
    const data = {
      activePage: e,
      activeCategory: this.state.activeCategory,
      serachName: this.state.serachName,
      sort: this.state.sort,
      by: this.state.by,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
  };

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
    this.getProducts();
  }

  render() {
    return (
      <Fragment>
        <Navbar activeNav="home" />
        <div className="container">
          <ul className="nav nav-product a">
            <li className="nav-item">
              <Link
                className="nav-link"
                id=""
                to="#"
                onClick={this.onClickMenu}
              >
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="food"
                to="#"
                onClick={this.onClickMenu}
              >
                Foods
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="drink"
                to="#"
                onClick={this.onClickMenu}
              >
                Drinks
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort
              </Link>
              <div className="dropdown-menu">
                <Link
                  className="dropdown-item"
                  to="#"
                  id="ASC"
                  onClick={this.onSort}
                >
                  Ascending
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  id="DESC"
                  onClick={this.onSort}
                >
                  Descending
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                By
              </Link>
              <div className="dropdown-menu">
                <Link
                  className="dropdown-item"
                  to="#"
                  id="date_added"
                  onClick={this.onBy}
                >
                  Date Added
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  id="name"
                  onClick={this.onBy}
                >
                  Name
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  id="price"
                  onClick={this.onBy}
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

          <div className="row products">
            {this.props.products.map(product => (
              <CardProduct product={product} key={product.id} />
            ))}
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              {this.props.pages.map(page => (
                <li
                  className="page-item"
                  key={page}
                  id={page}
                  onClick={() => this.changePage(page)}
                >
                  <Link className="page-link" to="#">
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Fragment>
    );
  }
}

const mapProducts = state => {
  return {
    products: state.products.products,
    pages: state.products.pages
  };
};

export default connect(mapProducts)(Products);
