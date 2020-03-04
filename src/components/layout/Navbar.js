import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component {
    logout = () => {
        localStorage.removeItem('user-id')
        localStorage.removeItem('token')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('status')
    }
    render() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ background: 'white' }} >
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">
                        IrsandiCafe<i className="material-icons small">local_cafe</i>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link a" to="/">
                                    <i className="material-icons small">home</i>Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link a" to="/dash">
                                    <i className="material-icons small">person</i>Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link a" to="/cart">
                                    <i className="material-icons small">shopping_cart</i>Cart <span className="badge badge-info">{this.props.number}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link a" to="/login" onClick={this.logout}>
                                    <i className="material-icons small">lock_open</i>Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        )
    }
}

const getNumber = (state) => {
    return {
        number: state.cart.totalPurchase
    }
}

export default connect(getNumber)(Navbar)