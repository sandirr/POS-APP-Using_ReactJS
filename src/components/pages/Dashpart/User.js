import React, { Component } from "react";
import "../Home.css";
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/User";

import Deleteuser from "../../modals/Deleteuser";
import Edituser from "../../modals/Edituser";

class User extends Component {
  state = {
    id: "",
    data: []
  };

  getUsers() {
    this.props.dispatch(getUsers());
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
    this.getUsers();
  }

  render() {
    const Buttondelete = user => {
      if (user.user.status === "cashier") {
        return (
          <span>
            <button
              className="btn btn-outline-warning"
              data-toggle="modal"
              data-target="#edit-user"
              onClick={() => this.editData(user.user)}
            >
              Edit
            </button>{" "}
            -{" "}
            <button
              className="btn btn-outline-danger"
              data-toggle="modal"
              data-target="#delete-user"
              onClick={() => this.deleteData(user.user.id)}
            >
              Delete
            </button>
          </span>
        );
      } else if (
        parseInt(user.user.id) === parseInt(localStorage.getItem("user-id"))
      ) {
        return (
          <span>
            <button
              className="btn btn-outline-warning"
              data-toggle="modal"
              data-target="#edit-user"
              onClick={() => this.editData(user.user)}
            >
              Edit
            </button>{" "}
            -{" "}
            <button
              className="btn btn-outline-danger"
              disabled={true}
              style={{ cursor: "not-allowed" }}
            >
              Delete
            </button>
          </span>
        );
      } else {
        return (
          <span>
            <button
              className="btn btn-outline-warning"
              disabled={true}
              style={{ cursor: "not-allowed" }}
            >
              Edit
            </button>{" "}
            -{" "}
            <button
              className="btn btn-outline-danger"
              disabled={true}
              style={{ cursor: "not-allowed" }}
            >
              Delete
            </button>
          </span>
        );
      }
    };
    return (
      <div hidden={this.props.userHidden}>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>
                  <Buttondelete user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Deleteuser id={this.state.id} />
        <Edituser data={this.state.data} />
      </div>
    );
  }
}

const mapUsers = state => {
  return {
    users: state.users.users
  };
};

export default connect(mapUsers)(User);
