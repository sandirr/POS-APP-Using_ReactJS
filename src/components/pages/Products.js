import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class Products extends Component {
    render() {
        return (
            <div className="row">
                {this.props.products.map((product, index) =>
                    <div className="col-md-6 col-lg-4" key={product.id}>
                        <div className="card">
                            <img src={product.image} className="card-img-top" alt="" />
                            <div className="card-body">
                                <div style={{ float: 'left', marginLeft: '-20px' }}>
                                    <p className="card-text" style={{ marginTop: '-15px' }}>{product.name}</p>
                                    <h6 className="card-title" style={{ marginTop: '-15px', fontWeight: 'bolder' }}>
                                        Rp. {product.price}
                                    </h6>
                                </div>
                                <div style={{ float: 'right', marginTop: '-10px' }}>
                                    <a href="/" className="card-link btn btn-small btn-outline-primary">Edit</a>
                                    <a href="/" className="card-link btn btn-small btn-outline-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Products