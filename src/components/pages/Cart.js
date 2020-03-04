import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Home.css'
import Navbar from '../layout/Navbar'
import uniqid from 'uniqid'
import { checkout } from '../redux/actions/Cart'

class Cart extends Component {
    purchaseHandler = () => {
        const data = {
            "idBuyer": `${uniqid()}`,
            "products":
                this.props.productsInCart
        }
        this.props.dispatch(checkout(data))
    }
    render() {
        const ViewCart = () => {
            if (this.props.productsInCart.length < 1) {
                return (
                    <h3 style={{ marginTop: '20px' }}>Ups... There is no product to buy</h3>
                )
            }
            else {
                return (
                    <div className="col-8" style={{ marginTop: '15px' }}>
                        {this.props.productsInCart.map((purchase) =>
                            <li className="list-group-item"
                                style={{ padding: '0', border: 'none' }} key={purchase.productId}>
                                <div className="media" style={{ textAlign: 'left' }}>

                                    <img style={{ width: '64px', height: '60px', borderRadius: '8px' }} src={purchase.image} className="mr-3" alt="..." />

                                    <div className="media-body">
                                        <h6 className="mt-0 cartName">{purchase.name}</h6>
                                        <span style={{ position: 'relative', top: '-6px' }}>
                                            <button className="btn btn-outline-primary btn-sm"
                                                onClick={this.reduceStock}>-</button>

                                            <button className="btn cartStock">{purchase.quantity}</button>

                                            <button className="btn btn-outline-primary btn-sm"
                                                onClick={this.addStock}>+</button>
                                            <span id={purchase.price} style={{ float: 'right' }} className="cartPrice">{purchase.price}</span>
                                        </span>
                                    </div>
                                </div>
                                <hr />
                            </li>
                        )}
                        <button className="btn btn-info" onClick={this.purchaseHandler}>Checkout</button>
                    </div>
                )
            }
        }
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-8" style={{ marginTop: '15px' }}>
                            <ViewCart />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapCart = (state) => {
    return {
        productsInCart: state.cart.cart
    }
}

export default connect(mapCart)(Cart)