import React, { Component } from 'react'
import './Home.css'
import { connect } from 'react-redux'
import { getProducts, deleteProduct } from '../redux/actions/Product'
import Addproduct from '../layout/Addproduct'
import Editproduct from '../layout/Editproduct'

class Dashboard extends Component {

    state = {
        data: []
    }

    getProducts() {
        this.props.dispatch(getProducts())
    }

    deleteData = (id) => {
        this.props.dispatch(deleteProduct(id))
    }

    editData = (data) => {
        this.setState({
            data: data
        })
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        return (
            <div className="container table-dash">
                <div className="row">
                    <div className="col-lg-11">

                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.products.map((product, index) =>
                                    <tr key={index}>
                                        <th scope="row">{product.id}</th>
                                        <td>{product.name}</td>
                                        <td><img alt={product.description} src={product.image} /></td>
                                        <td>{product.category}</td>
                                        <td>Rp. {product.price}</td>
                                        <td>
                                            <button className="btn btn-info"
                                                onClick={() => this.editData(product)}
                                                data-toggle="modal" data-target="#edit-product">Edit</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                onClick={() => this.deleteData(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-1">
                        <div className="btn-group-vertical" style={{ position: 'fixed' }}>
                            <button className="btn btn-outline-info" data-toggle="modal" data-placement="right" title="Add Menu" data-target="#add-product">
                                <i className="material-icons">add_to_photos</i>
                            </button>
                            <button className="btn btn-outline-info" data-toggle="tooltip" data-placement="right" title="View Purchase History">
                                <i className="material-icons">insert_chart</i>
                            </button>
                            <button className="btn btn-outline-info" data-toggle="tooltip" data-placement="right" title="Category Management">
                                <i className="material-icons">library_books</i>
                            </button>
                            <button className="btn btn-outline-info" data-toggle="tooltip" data-placement="right" title="User Management">
                                <i className="material-icons">people</i>
                            </button>
                        </div>
                    </div>
                </div>
                <Addproduct />
                <Editproduct data={this.state.data} />
            </div>
        )
    }
}

const mapProducts = (state) => {
    return {
        products: state.products.products
    }
}

export default connect(mapProducts)(Dashboard)