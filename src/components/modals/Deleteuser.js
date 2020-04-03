import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUser } from '../redux/actions/User'

class Deleteuser extends Component {

    state = {
        id: 0,
    }

    componentWillReceiveProps({ id }) {
        this.onSetValue(id)
    }

    onSetValue = (id) => {
        this.setState({
            id: id
        })
    }

    deleteUser = () => {
        this.props.dispatch(deleteUser(this.state.id))
    }

    render() {
        return (
            <div className="modal fade" id="delete-user" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Delete Menu</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button"
                                onClick={this.deleteUser}
                                data-dismiss="modal"
                                className="btn btn-primary">Yes</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect()(Deleteuser)