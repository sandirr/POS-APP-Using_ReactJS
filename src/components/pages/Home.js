import React, { Component, Fragment } from 'react'
import CardProduct from '../layout/CardProduct'
import './Home.css'
import Navbar from '../layout/Navbar'
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions/Product'
import { Link } from 'react-router-dom'

class Products extends Component {

    state = {
        activePage: 1,
        sort: 'ASC',
        by: 'id',
        serachName: '',
        activeCategory: ''
    }

    getProducts() {
        const data = {}
        this.props.dispatch(getProducts(data))
    }

    changePage = (e) => {
        this.setState({
            activePage: e
        })
        const data = {
            activePage: e,
            activeCategory: this.state.activeCategory,
            serachName: this.state.serachName,
            sort: this.state.sort,
            by: this.state.by
        }
        this.props.dispatch(getProducts(data))
    }

    componentDidMount() {
        if (!localStorage.getItem('isAuth')) {
            this.props.history.push('/login');
        }
        this.getProducts()
    }

    render() {
        return (
            <Fragment>
                <Navbar />
                <div className="container">
                    <ul class="nav nav-product">
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Active</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Separated link</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>

                    <div className="row products">
                        {this.props.products.map(product =>
                            <CardProduct product={product} key={product.id} />
                        )}
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {this.props.pages.map(page =>
                            <li className="page-item" key={page} id={page} onClick={() => this.changePage(page)}>
                                <Link className="page-link" to="/">{page}</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </Fragment>
        )
    }
}

const mapProducts = (state) => {
    return {
        products: state.products.products,
        pages: state.products.pages
    }
}

export default connect(mapProducts)(Products)