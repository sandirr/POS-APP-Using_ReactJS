import React, { Component } from 'react'
import '../Home.css'
import { connect } from 'react-redux'
import { getProducts } from '../../redux/actions/Product'

import { Link } from 'react-router-dom'

import Addproduct from '../../modals/Addproduct'
import Editproduct from '../../modals/Editproduct'
import Deleteproduct from '../../modals/Deleteproduct'

class Product extends Component {

    state = {
        data: [],
        id: '',

        activePage: 1,
        sort: 'ASC',
        by: 'id',
        serachName: '',
        activeCategory: ''
    }

    onClickMenu = (e) => {
        this.setState({ activeCategory: e.target.id })
        if (e.target.id === '') this.setState({ activeCategory: '' })
        const data = {
            activePage: 1,
            activeCategory: e.target.id,
            serachName: '',
            sort: this.state.sort,
            by: this.state.by
        }
        this.props.dispatch(getProducts(data))
    }

    onSort = (e) => {
        this.setState({ sort: e.target.id })
        const data = {
            activePage: 1,
            activeCategory: this.state.activeCategory,
            serachName: '',
            sort: e.target.id,
            by: this.state.by
        }
        this.props.dispatch(getProducts(data))
    }

    onBy = (e) => {
        this.setState({ by: e.target.id })
        const data = {
            activePage: 1,
            activeCategory: this.state.activeCategory,
            serachName: '',
            sort: this.state.sort,
            by: e.target.id
        }
        this.props.dispatch(getProducts(data))
    }

    onChangeSearch = (e) => {
        this.setState({ serachName: e.target.value })
        const data = {
            activePage: 1,
            activeCategory: this.state.activeCategory,
            serachName: e.target.value,
            sort: this.state.sort,
            by: this.state.by
        }
        this.props.dispatch(getProducts(data))
    }

    changePage = (e) => {
        this.setState({ activePage: e })
        const data = {
            activePage: e,
            activeCategory: this.state.activeCategory,
            serachName: this.state.serachName,
            sort: this.state.sort,
            by: this.state.by
        }
        this.props.dispatch(getProducts(data))
    }

    getProducts() {
        const data = {}
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
            <div hidden={this.props.productHidden}>
                <ul className="nav nav-product">
                    <li className="nav-item">
                        <Link to="#" className="nav-link" id='' onClick={this.onClickMenu}>All</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link" id="food" onClick={this.onClickMenu}>Foods</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link" id="drink" onClick={this.onClickMenu}>Drinks</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sort</Link>
                        <div className="dropdown-menu">
                            <Link to="#" className="dropdown-item" id="ASC" onClick={this.onSort}>Ascending</Link>
                            <Link to="#" className="dropdown-item" id="DESC" onClick={this.onSort}>Descending</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">By</Link>
                        <div className="dropdown-menu">
                            <Link to="#" className="dropdown-item" id="date_added" onClick={this.onBy}>Date Added</Link>
                            <Link to="#" className="dropdown-item" id="name" onClick={this.onBy}>Name</Link>
                            <Link to="#" className="dropdown-item" id="price" onClick={this.onBy}>Price</Link>
                        </div>
                    </li>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.onChangeSearch} />
                    </form>
                </ul>
                <table className="table table-dash table-striped">
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
                <nav aria-label="Page navigation example" style={{ position: 'fixed', bottom: '5px', width: '80%' }}>
                    <ul className="pagination justify-content-center">
                        {this.props.pages.map(page =>
                            <li className="page-item" key={page} id={page} onClick={() => this.changePage(page)}>
                                <Link to="#" className="page-link">{page}</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

        )
    }
}

const mapProducts = (state) => {
    return {
        products: state.products.products,
        pages: state.products.pages
    }
}

export default connect(mapProducts)(Product)