import React, { Component } from 'react'
import './Home.css'

import Category from './Dashpart/Category'
import Product from './Dashpart/Product'

class Dashboard extends Component {

    state = {
        productHidden: false,
        categoryHidden: true,
        dataTarget: '#add-product',
        productNav: 'btn btn-outline-info active',
        categoryNav: 'btn btn-outline-info',
    }

    activatedCategory = (event) => {
        this.setState({
            categoryHidden: false,
            productHidden: true,
            dataTarget: '#add-category',
            categoryNav: 'btn btn-outline-info active',
            productNav: 'btn btn-outline-info',
        })
    }

    activatedProduct = (event) => {
        this.setState({
            categoryHidden: true,
            productHidden: false,
            dataTarget: '#add-product',
            categoryNav: 'btn btn-outline-info',
            productNav: 'btn btn-outline-info active',
        })
    }

    componentDidMount(){
        if(localStorage.getItem('status') !== 'admin'){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="container table-dash">
                <div className="row product-manage">
                    <div className="col-lg-11">
                        <Product productHidden={this.state.productHidden} />
                        <Category categoryHidden={this.state.categoryHidden} />
                    </div>
                    <div className="col-lg-1">
                        <div className="btn-group-vertical" style={{ position: 'fixed' }}>
                            <button className="btn btn-outline-dark" data-toggle="modal" data-placement="right" title="Add" data-target={this.state.dataTarget}>
                                <i className="material-icons">add_to_photos</i>
                            </button>
                            <button className={this.state.productNav} data-toggle="tooltip" data-placement="right"
                                onClick={() => this.activatedProduct()}
                                title="Product Management">
                                <i className="material-icons">restaurant_menu</i>
                            </button>
                            <button className={this.state.categoryNav} data-toggle="tooltip" data-placement="right"
                                id="categoryHidden"
                                onClick={() => this.activatedCategory()}
                                title="Category Management">
                                <i className="material-icons">library_books</i>
                            </button>
                            <button className="btn btn-outline-info" data-toggle="tooltip" data-placement="right" title="View Purchase History">
                                <i className="material-icons">insert_chart</i>
                            </button>
                            <button className="btn btn-outline-info" data-toggle="tooltip" data-placement="right" title="User Management">
                                <i className="material-icons">people</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard