import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteCategory } from '../redux/actions/Category'

class Deletecategory extends Component {

    state = {
        id: 0,
    }

    componentWillReceiveProps({ id }) {
        this.onSetValue(id);
    }

    onSetValue = (id) => {
        this.setState({
            id: id
        })
    }

    deleteCategory = () => {
        this.props.dispatch(deleteCategory(this.state.id))
    }


    render() {
        return (
            <div className="modal fade" id="delete-category" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Delete Category</h5>
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
                                onClick={this.deleteCategory}
                                data-dismiss="modal"
                                className="btn btn-primary">Yes</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect()(Deletecategory)