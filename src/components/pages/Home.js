import React, { Component, Fragment } from "react";
import CardProduct from "../layout/CardProduct";
import "./Home.css";
import { connect } from "react-redux";
import { getProducts } from "../redux/actions/Product";
import { getCategories } from "../redux/actions/Category";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";
import querystring from "query-string";

class Products extends Component {
  state = {
    activePage: 1,
    sort: "ASC",
    by: "id",
    searchName: "",
    activeCategory: ""
  };

  onClickMenu = async e => {
    await this.setState({ activeCategory: e });
    this.props.history.push(
      `?name=${this.state.searchName}&category=${e}&sort=${this.state.sort}&by=${this.state.by}`
    );
    if (e === "") this.setState({ activeCategory: "" });
    const data = {
      activePage: 1,
      activeCategory: e,
      searchName: this.state.searchName,
      sort: this.state.sort,
      by: this.state.by,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
    this.props.dispatch(getCategories());
  };

  onSort = async e => {
    await this.setState({ sort: e });
    this.props.history.push(
      `?name=${this.state.searchName}&category=${this.state.activeCategory}&sort=${e}&by=${this.state.by}`
    );
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      searchName: this.state.searchName,
      sort: e,
      by: this.state.by,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
  };

  onBy = async e => {
    await this.setState({ by: e });
    this.props.history.push(
      `?name=${this.state.searchName}&category=${this.state.activeCategory}&sort=${this.state.sort}&by=${e}`
    );
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      searchName: this.state.searchName,
      sort: this.state.sort,
      by: e,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
  };

  onChangeSearch = e => {
    this.setState({ searchName: e.target.value });
    this.props.history.push(
      `?name=${e.target.value}&category=${this.state.activeCategory}&sort=${this.state.sort}&by=${this.state.by}`
    );
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      searchName: e.target.value,
      sort: this.state.sort,
      by: this.state.by,
      user: "cashier"
    };
    this.props.dispatch(getProducts(data));
  };

  changePage = async e => {
    await this.setState({ activePage: e });
    this.props.history.push(
      `?name=${this.state.searchName}&category=${this.state.activeCategory}&sort=${this.state.sort}&by=${this.state.by}&page=${e}`
    );
    const data = {
      activePage: e,
      activeCategory: this.state.activeCategory,
      searchName: this.state.searchName,
      sort: this.state.sort,
      by: this.state.by,
      user: "cashier"
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
        by: q.by,
        user: "cashier"
      };
    } else {
      data = { user: "cashier" };
    }
    this.props.dispatch(getProducts(data));
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
    this.getProducts();
    this.props.dispatch(getCategories());
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
                  id={category.name}
                  onClick={() => this.onClickMenu(category.name)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
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
                  onClick={() => this.onSort("ASC")}
                >
                  Ascending
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  id="DESC"
                  onClick={() => this.onSort("DESC")}
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
                  onClick={() => this.onBy("date_added")}
                >
                  Date Added
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  id="name"
                  onClick={() => this.onBy("name")}
                >
                  Name
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
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
    pages: state.products.pages,
    categories: state.categories.categories
  };
};

export default withRouter(connect(mapProducts)(Products));
