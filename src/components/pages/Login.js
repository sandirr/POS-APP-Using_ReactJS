import React, { Component } from "react";
import axios from "axios";
import "./Home.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      alertHidden: true,
      error: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:8181/user/login/", this.state)
      .then(res => {
        console.log(res.data.error)
        if (res.data.error === 'Wrong Email') {
          return this.setState({ alertHidden: false, error: "Email is not registered" });
        }
        localStorage.setItem("token", res.data.result.token);
        localStorage.setItem("user-id", res.data.result.id);
        localStorage.setItem("status", res.data.result.status);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({ alertHidden: false, error: "Wrong Password" });
      });
  };

  render() {
    return (
      <div>
        <div className="secure-img"></div>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8">
              <div
                className="alert alert-danger mt-2"
                hidden={this.state.alertHidden}
                role="alert"
              >
                {this.state.error}
              </div>
              <h4 style={{ margin: "20px auto" }}>Login</h4>
              <form onSubmit={this.onSubmit}>
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
