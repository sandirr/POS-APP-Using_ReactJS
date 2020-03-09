import React, { Component } from "react";
import axios from "axios";
import "./Home.css";
import Navbar from "../layout/Navbar";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.password2)
      return alert("Check your password/retype password");
    axios
      .post("http://localhost:8181/user/register/", this.state)
      .then(res => {
        this.props.history.push("/dash");
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    if (
      localStorage.getItem("status") !== "admin" &&
      localStorage.getItem("status") !== "super_admin"
    ) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <Navbar activeNav="signup" />
        <div className="secure-img"></div>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="name"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Retype Password</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password2"
                    onChange={this.onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
