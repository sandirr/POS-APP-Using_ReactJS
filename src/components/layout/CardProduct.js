import React, { Component } from "react";
import "./Card.css";
import { connect } from "react-redux";
import { postCart } from "../redux/actions/Cart";

class CardProduct extends Component {
  addToCart = e => {
    var a;
    this.props.productsInCart.forEach(product => {
      if (parseInt(product.productId) === parseInt(e.id)) {
        a = 0;
        alert("Already in cart");
      }
    });

    if (a !== 0) {
      const data = {
        name: e.name,
        image: e.image,
        productId: e.id,
        price: e.price,
        stock: e.stock,
        quantity: 1
      };
      this.props.dispatch(postCart(data));
    }
  };
  render() {
    const PriceParsed = (data)=>{
      return(
      <span>{data.data.toString().split('').reverse().join('').match(/\d{1,3}/g).join('.').split('').reverse().join('')}</span>
      )
    }
    return (
      <div className="col-lg-3 col-md-4">
        <div className="card">
          <img className="card-img-top" alt="" src={this.props.product.image} />
          <div className="card-body">
            <div>
              <p className="card-text">{this.props.product.name}</p>
              <h6 className="card-title">Rp. <PriceParsed data={this.props.product.price}/></h6>
            </div>

            <button
              onClick={() => this.addToCart(this.props.product)}
              className="card-link btn btn-small btn-outline-info"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapCart = state => {
  return {
    productsInCart: state.cart.cart
  };
};

export default connect(mapCart)(CardProduct);
