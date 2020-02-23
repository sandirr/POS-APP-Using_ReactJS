import React, { Component } from 'react'
import './App.css'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
// import Navbar from './components/layouts/Navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      food_class: 'nav-link',
      drink_class: 'nav-link',
      all_class: 'nav-link active',
      name: '',
      image: '',
      category: 0,
      realCategory: '',
      price: 0,
      stock: 0,
      searchName: '',
      formStatus: 'Add',
      productIdSelected: null
    }
  }

  // When nav clicked
  onClickMenu = (event) => {
    event.preventDefault()
    this.setState({
      all_class: 'nav-link',
      food_class: 'nav-link',
      drink_class: 'nav-link',
      [event.target.name]: 'nav-link active',
    })
    axios
      .get(`http://localhost:8181/product/?category=${event.target.id}`)
      .then(res => {
        this.setState({ products: res.data.result })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // When searching
  onChangeSearch = (event) => {
    this.setState({
      all_class: 'nav-link active',
      food_class: 'nav-link',
      drink_class: 'nav-link',
      searchName: event.target.value
    })
    axios
      .get(`http://localhost:8181/product/?name=${event.target.value}`)
      .then(res => {
        this.setState({ products: res.data.result })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // on input of form changed
  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // when user input image file
  handleFileChange = e => {
    this.setState({ [e.target.name]: e.target.files[0] })
  }

  // Form submit
  onSubmitHandler = event => {
    event.preventDefault()
    let formData = new FormData()

    formData.append("image", this.state.image)
    formData.append("name", this.state.name)
    formData.append("category", this.state.category)
    formData.append("price", this.state.price)
    formData.append("stock", this.state.stock)
    if (this.state.formStatus === "Add") {
      this.postData(formData)
    }
    else if (this.state.formStatus === "Edit") {
      if (this.state.image === "") {
        formData.delete("image")
        this.patchData(formData)
      }
      else {
        this.patchData(formData)
      }
    }
  }

  // Edit data
  patchData = (formData) => {
    const options = {
      method: "PATCH",
      body: formData
    }
    fetch(`http://localhost:8181/product/${this.state.productIdSelected}`, options)
      .then(res => {
        console.log(res, "Data has been updated")
        this.componentDidMount()
      })
  }

  // Add Data
  postData = (formData) => {
    const options = {
      method: "POST",
      body: formData
    }
    fetch(`http://localhost:8181/product/`, options)
      .then(res => {
        console.log(res, "Data has been added")
        this.componentDidMount()
      })
  }

  // close button
  closeButtonHandler = () => {
    document.querySelector('.overlay .card').style.zIndex = -1
    document.querySelector('.overlay .card').style.opacity = 0
  }

  // add button
  addButtonHandler = () => {
    this.setState({
      formStatus: 'Add',
      name: '',
      image: '',
      category: '',
      price: 0,
      stock: 0,
    })
    document.querySelector('.overlay .card').style.zIndex = 9999
    document.querySelector('.overlay .card').style.opacity = 1
  }

  // edit button
  editButtonHandler = (product) => {
    document.querySelector('.overlay .card').style.zIndex = 9999
    document.querySelector('.overlay .card').style.opacity = 1

    this.setState({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      productIdSelected: product.id,
      formStatus: 'Edit'
    })

  }

  componentDidMount() {
    axios
      .get(`http://localhost:8181/product/`)
      .then(res => {
        this.setState({ products: res.data.result })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ background: 'white' }} >
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" id="" name="all_class" onClick={this.onClickMenu} href="/">IrsandiCafe</a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <a className={this.state.all_class} id="" name="all_class" onClick={this.onClickMenu} href="/">All</a>
                </li>
                <li className="nav-item">
                  <a className={this.state.food_class} id="food" name="food_class" onClick={this.onClickMenu} href="?category=food">Food</a>
                </li>
                <li className="nav-item">
                  <a className={this.state.drink_class} id="drink" name="drink_class" onClick={this.onClickMenu} href="?category=drink">Drink</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/drink" onClick={this.onClickMenu}>Admin</a>
                </li>
              </ul>
              <form className="form-inline my-3 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.onChangeSearch} />
              </form>
            </div>
          </div>
        </nav >

        {/* Products */}
        <div className="row">
          <div className="col-md-9 products">
            <div className="row">
              <h3 className="add" onClick={this.addButtonHandler}>
                <button className="badge badge-pill badge-warning">
                  <i className="material-icons">add</i>
                </button>
              </h3>
              {this.state.products.map((product, index) =>
                <div className="col-md-6 col-lg-4" key={product.id}>
                  <div className="card">
                    <img src={product.image} className="card-img-top" alt="" />
                    <div className="card-body">
                      <div style={{ float: 'left', marginLeft: '-10px' }}>
                        <p className="card-text" style={{ marginTop: '-15px' }}>{product.name}</p>
                        <h6 className="card-title" style={{ marginTop: '-15px', fontWeight: 'bolder' }}>
                          Rp. {product.price}
                        </h6>
                      </div>
                      <div style={{ float: 'right', marginTop: '-10px' }}>
                        <button onClick={() => this.editButtonHandler(product)} className="card-link btn btn-small btn-outline-primary">Edit</button>
                        <button className="card-link btn btn-small btn-outline-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cart and Form */}
          <div className="col-md-3">
            <div className="row" style={{ margin: '10px' }}>
              <div className="col-md-12" style={{ textAlign: 'center', position: 'relative' }}>
                <h6>Cart <span className="badge badge-primary badge-pill">0</span></h6>
                <small>{this.state.searchName}</small>
                <div className="overlay">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{this.state.formStatus} Menu</h5>
                      <hr />
                      <form encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                          <input placeholder="Product Name..." value={this.state.name} required className="form-control" type="text" name="name" onChange={this.onChangeHandler}></input>
                        </div>
                        <div className="form-group">
                          <label>Image:</label>
                          <input className="form-control-file" type="file" name="image" onChange={this.handleFileChange}></input>
                        </div>
                        <div className="form-group">
                          <label>Category:</label>
                          <select className="form-control" required name="category" onChange={this.onChangeHandler}>
                            <option selected disabled>Choose...</option>
                            <option value={1}>Food</option>
                            <option value={2}>Drink</option>
                          </select>
                        </div>
                        <label>Price:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Rp.</span>
                          </div>
                          <input required placeholder="Price..." value={this.state.price} className="form-control" type="number" name="price" onChange={this.onChangeHandler}></input>
                        </div>
                        <br />
                        <div className="form-group">
                          <label>Stock:</label>
                          <input placeholder="Stock..." value={this.state.stock} required className="form-control" type="number" name="stock" onChange={this.onChangeHandler}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Send</button>
                        <button type="reset" className="btn btn-danger" onClick={this.closeButtonHandler} style={{ float: 'right' }}>Close</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div >
    )
  }
}

export default App
