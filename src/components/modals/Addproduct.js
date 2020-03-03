import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postProduct } from '../redux/actions/Product'
import { getCategories } from '../redux/actions/Category'

class Addproduct extends Component {
    state = {
        name: '',
        category: 0,
        image: '',
        price: '',
        stock: '',
        description: '',
        imagelo: ''
    }
    getCategories() {
        this.props.dispatch(getCategories())
    }
    componentDidMount() {
        this.getCategories()
    }
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFileChange = (e) => {
        this.setState({
            image: e.target.files[0],
            imagelo: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append("name", this.state.name)
        data.append("image", this.state.image)
        data.append("category", this.state.category)
        data.append("price", this.state.price)
        data.append("stock", this.state.stock)
        data.append("description", this.state.description)
        this.props.dispatch(postProduct(data))
        this.setState({
            name: '',
            category: 0,
            price: '',
            stock: '',
            image: '',
            description: '',
            imagelo: '',
        })
    }

    render() {
        return (
            <div className="modal fade" id="add-product" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">Add Menu</h5>
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
                                <div className="input-group mb-3" >
                                    <input style={{ border: 'none' }} value={this.state.imagelo} className="form-control" type="file" name="imagelo" onChange={this.handleFileChange}></input>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Image</span>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <select className="form-control" value={this.state.category} required name="category" onChange={this.onChangeHandler}>
                                        <option value={0} disabled={true}>Choose category</option>
                                        {this.props.categories.map((category, index) =>
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Rp.</span>
                                    </div>
                                    <input required value={this.state.price} className="form-control" type="number" name="price" onChange={this.onChangeHandler}></input>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Price</span>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input value={this.state.stock} required className="form-control" type="number" name="stock" onChange={this.onChangeHandler}></input>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Stock</span>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <textarea value={this.state.description} className="form-control" type="number" name="description" onChange={this.onChangeHandler}></textarea>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Description</span>
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

export default connect(mapCategories)(Addproduct)