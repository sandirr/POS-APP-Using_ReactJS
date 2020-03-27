import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  state = {
    home: "nav-link a",
    cart: "nav-link a",
    dashboard: "nav-link a"
  };
  logout = () => {
    localStorage.removeItem("user-id");
    localStorage.removeItem("token");
    localStorage.removeItem("status");
  };
  componentDidMount() {
    this.active(this.props.activeNav);
  }
  active = activeNav => {
    console.log(activeNav);
    if (activeNav === "home") this.setState({ home: "nav-link a active" });
    else if (activeNav === "cart") this.setState({ cart: "nav-link a active" });
    else if (activeNav === "dashboard")
      this.setState({ dashboard: "nav-link a active" });
  };
  render() {
    const Dashboard = () => {
      if (
        localStorage.getItem("status") === "admin" ||
        localStorage.getItem("status") === "super_admin"
      ) {
        return (
          <li className="nav-item">
            <Link
              className={this.state.dashboard}
              onClick={this.clickToActive}
              to="/dash"
            >
              <i className="material-icons small">person</i>
              Dashboard
            </Link>
          </li>
        );
      } else {
        return <span></span>;
      }
    };
    return (
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-light"
        style={{ background: "#f3f3f3" }}
      >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">
            IrsandiCafe<i className="material-icons small">local_cafe</i>
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className={this.state.home} to="/">
                  <i className="material-icons small">home</i>Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={this.state.cart} to="/cart">
                  <i className="material-icons small">shopping_cart</i>Cart{" "}
                  <span className="badge badge-info">{this.props.number}</span>
                </Link>
              </li>
              <Dashboard />
              <li className="nav-item">
                <Link className="nav-link a" to="/login" onClick={this.logout}>
                  <i className="material-icons small">lock_open</i>Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const getNumber = state => {
  return {
    number: state.cart.totalPurchase
  };
};

export default connect(getNumber)(Navbar);
