import React, { Component, Fragment } from 'react'
import './Home.css'
import Navbar from '../layout/Navbar'
import Category from './Dashpart/Category'
import Product from './Dashpart/Product'
import User from './Dashpart/User'
import History from './Dashpart/History'

class Dashboard extends Component {

    state = {
        productHidden: false,
        categoryHidden: true,
        userHidden: true,
        historyHidden: true,

        dataTarget: '#add-product',

        productNav: 'btn btn-outline-info active',
        categoryNav: 'btn btn-outline-info',
        userNav: 'btn btn-outline-info',
        historyNav: 'btn btn-outline-info',
    }

    signUp = (e) => {
        e.preventDefault()
        if (this.state.dataTarget === 'signup') {
            this.props.history.push('/signup')
        }
    }

    activatedCategory = (event) => {
        this.setState({
            categoryHidden: false,
            productHidden: true,
            userHidden: true,
            historyHidden: true,

            dataTarget: '#add-category',

            categoryNav: 'btn btn-outline-info active',
            productNav: 'btn btn-outline-info',
            userNav: 'btn btn-outline-info',
            historyNav: 'btn btn-outline-info',
        })
    }

    activatedProduct = (event) => {
        this.setState({
            categoryHidden: true,
            userHidden: true,
            productHidden: false,
            historyHidden: true,

            dataTarget: '#add-product',

            categoryNav: 'btn btn-outline-info',
            userNav: 'btn btn-outline-info',
            historyNav: 'btn btn-outline-info',
            productNav: 'btn btn-outline-info active',
        })
    }

    activatedUser = (event) => {
        this.setState({
            categoryHidden: true,
            userHidden: false,
            productHidden: true,
            historyHidden: true,

            dataTarget: 'signup',

            categoryNav: 'btn btn-outline-info',
            userNav: 'btn btn-outline-info active',
            productNav: 'btn btn-outline-info',
            historyNav: 'btn btn-outline-info',
        })
    }

    activatedHistory = (event) => {
        this.setState({
            categoryHidden: true,
            userHidden: true,
            productHidden: true,
            historyHidden: false,

            dataTarget: 'disabled',

            categoryNav: 'btn btn-outline-info',
            userNav: 'btn btn-outline-info',
            productNav: 'btn btn-outline-info',
            historyNav: 'btn btn-outline-info active',
        })
    }

    componentDidMount() {
        if (localStorage.getItem('status') !== 'admin') {
            alert('You`re not authorized as administrator')
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <Fragment>
                <Navbar />
                <div className="container table-dash">
                    <div className="row product-manage">
                        <div className="col-lg-11">
                            <Product productHidden={this.state.productHidden} />
                            <Category categoryHidden={this.state.categoryHidden} />
                            <User userHidden={this.state.userHidden} />
                            <History historyHidden={this.state.historyHidden} />
                        </div>
                        <div className="col-lg-1">
                            <div className="btn-group-vertical" style={{ position: 'fixed' }}>
                                <button onClick={this.signUp} className="btn btn-outline-dark" data-toggle="modal"
                                    data-placement="right" title="Add" data-target={this.state.dataTarget}>
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
                                <button className={this.state.historyNav} data-toggle="tooltip" data-placement="right"
                                    id="historyHidden"
                                    onClick={() => this.activatedHistory()}
                                    title="View Purchase History">
                                    <i className="material-icons">insert_chart</i>
                                </button>
                                <button className={this.state.userNav} data-toggle="tooltip" data-placement="right"
                                    onClick={this.activatedUser}
                                    title="User Management">
                                    <i className="material-icons">people</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Dashboard