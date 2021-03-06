import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, postCategory } from '../redux/actions/Category'

class AddCategory extends Component {
    state = {
        name: '',
    }
    getCategories() {
        this.props.dispatch(getCategories())
    }
    componentDidMount() {
        this.getCategories()
    }
    onChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append("name", this.state.name)
        this.props.dispatch(postCategory(data))
    }

    render() {
        return (
            <div className="modal fade" id="add-category" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Add Category</h5>
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

const mapCategories = (state) => {
    return {
        categories: state.categories.categories
    }
}

export default connect(mapCategories)(AddCategory)