import React, { Component } from 'react'
import { connect } from 'react-redux'
import { patchUser } from '../redux/actions/User'

class Edituser extends Component {
    state = {
        name: '',
        id: 0,
        status: ''
    }
    componentWillReceiveProps({ data }) {
        this.onSetValue(data);
    }

    onSetValue = (data) => {
        this.setState({
            name: data.name,
            id: data.id,
            status: data.status
        })
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append("name", this.state.name)
        data.append("status", this.state.status)
        this.props.dispatch(patchUser(data, this.state.id))
    }

    render() {
        const Statushandler = () => {
            if (this.state.id === parseInt(localStorage.getItem('user-id'))) {
                return (
                    <select className="form-control" value="admin" required name="status" onChange={this.onChangeHandler}>
                        <option value="admin">Admin</option>
                        <option value="cashier" disabled={true}>Cashier</option>
                    </select>
                )
            }
            else {
                return (
                    <select className="form-control" value={this.state.status} required name="status" onChange={this.onChangeHandler}>
                        <option value="admin">Admin</option>
                        <option value="cashier">Cashier</option>
                    </select>
                )
            }
        }
        return (
            <div className="modal fade" id="edit-user" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Edit User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form encType="multipart/form-data">
                                <div className="input-group mb-3">
                                    <input value={this.state.name} required className="form-control" type="text" name="name" onChange={this.onChangeHandler}></input>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Name</span>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <Statushandler />
                                </div>
                                <button type="submit" className="btn btn-primary"
                                    onClick={this.onSubmitHandler}
                                    data-dismiss="modal">Send &raquo;</button>
                                <button type="reset" className="btn btn-danger" style={{ float: 'right' }} data-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect()(Edituser)