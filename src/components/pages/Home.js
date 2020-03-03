import React, { Component, Fragment } from 'react'
import CardProduct from '../layout/CardProduct'
import './Home.css'
import Navbar from '../layout/Navbar'
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions/Product'

class Products extends Component {

    getProducts() {
        this.props.dispatch(getProducts())
    }

    componentDidMount() {
        if(!localStorage.getItem('isAuth')){
            this.props.history.push('/login');
        }
        this.getProducts()
    }

    render() {
        return (
            <Fragment>
                <Navbar/>
                <div className="container bg-light">
                    <div className="row products">
                        {this.props.products.map(product =>
                            <CardProduct product={product} key={product.name} />
                        )}
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item"><a className="page-link" href="/">1</a></li>
                    </ul>
                </nav>
            </Fragment>
        )
    }
}

const mapProducts = (state) => {
    return {
        products: state.products.products
    }
}

export default connect(mapProducts)(Products)