import React, { Component } from 'react'
import './Card.css'

class CardProduct extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="col-lg-3 col-md-4">
                <div className="card">
                    <img className="card-img-top" alt="" src={this.props.product.image} />
                    <div className="card-body">
                        <div>
                            <p className="card-text" >{this.props.product.name}</p>
                            <h6 className="card-title">Rp. {this.props.product.price}</h6>
                        </div>

                        <button className="card-link btn btn-small btn-outline-info">Add to Cart</button>

                    </div>
                </div>
            </div>
        )
    }
}

export default CardProduct