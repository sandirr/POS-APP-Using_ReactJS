import React, { Component } from 'react'
import '../Home.css'
import { connect } from 'react-redux'
import { getProducts } from '../../redux/actions/Product'

import Addproduct from '../../modals/Addproduct'
import Editproduct from '../../modals/Editproduct'
import Deleteproduct from '../../modals/Deleteproduct'

class Product extends Component {

    state = {
        data: [],
        id: '',
    }

    getProducts() {
        const data={}
        this.props.dispatch(getProducts(data))
    }

    deleteData = (id) => {
        this.setState({
            id: id
        })
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
            <div>
                <table className="table" hidden={this.props.productHidden}>
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
                                    <button className="btn btn-outline-warning"
                                        onClick={() => this.editData(product)}
                                        data-toggle="modal" data-target="#edit-product">Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger"
                                        data-toggle="modal" data-target="#delete-product"
                                        onClick={() => this.deleteData(product.id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Addproduct />
                <Editproduct data={this.state.data} />
                <Deleteproduct id={this.state.id} />
            </div>

        )
    }
}

const mapProducts = (state) => {
    return {
        products: state.products.products
    }
}

export default connect(mapProducts)(Product)