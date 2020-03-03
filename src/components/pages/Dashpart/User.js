import React, { Component } from 'react'
import '../Home.css'
import { connect } from 'react-redux'
import { getUsers } from '../../redux/actions/User'

import Deleteuser from '../../modals/Deleteuser'

class User extends Component {

    state = {
        id: '',
        status: 'cashier'
    }

    getUsers() {
        this.props.dispatch(getUsers())
    }

    deleteData = (id) => {
        this.setState({
            id: id
        })
    }

    editData = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const Buttondelete = (user) => {
            if (user.user.status === "admin") {
                return (
                    <button disabled={true} className="btn btn-outline-danger"
                        style={{ cursor: 'not-allowed' }}>Delete</button>
                )
            }
            else {
                return (
                    <button className="btn btn-outline-danger"
                        data-toggle="modal" data-target="#delete-user"
                        onClick={() => this.deleteData(user.user.id)}>Delete</button>
                )
            }
        }

        const Statushandler = (user) => {
            if (user.user.status === "admin") {
                return (
                    <span>Admin</span>
                )
            }
            else {
                return (
                    <select value={this.state.status} onChange={this.editData}>
                        <option value="admin">Admin</option>
                        <option value="cashier">Cashier</option>
                    </select>
                )
            }
        }
        return (
            <div>
                <table className="table" hidden={this.props.userHidden}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map((user) =>
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>
                                    <Statushandler user={user} />
                                </td>
                                <td>
                                    <Buttondelete user={user} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Deleteuser id={this.state.id} />
            </div>

        )
    }
}

const mapUsers = (state) => {
    return {
        users: state.users.users
    }
}

export default connect(mapUsers)(User)