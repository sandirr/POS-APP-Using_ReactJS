import React, { Component } from 'react'
import './App.css'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
// import Navbar from './components/layouts/Navbar'
import Products from './components/pages/Products'

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
      price: 0,
      stock: 0,
      searchName: ''
    }
  }

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

  onChangeSearch = (event) => {
    this.setState({
      all_class: 'nav-link active',
      food_class: 'nav-link',
      drink_class: 'nav-link',
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

  getByName = () => {
    axios
      .get(`http://localhost:8181/product/?name=${this.state.searchName}`)
      .then(res => {
        this.setState({ products: res.data.result })
        console.log(this.state.products)
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFileChange = e => {
    this.setState({ [e.target.name]: e.target.files[0] })
  }

  onSubmitHandler = event => {
    event.preventDefault()
    let formData = new FormData()

    formData.append("image", this.state.image)
    formData.append("name", this.state.name)
    formData.append("category", this.state.category)
    formData.append("price", this.state.price)
    formData.append("stock", this.state.stock)
    const options = {
      method: "POST",
      body: formData
    }
    fetch(`http://localhost:8181/product/`, options)
      .then(res => {
        console.log(res)
        var products = [...this.state.products]
        products.push(res.data)
        this.setState({ products })
      })
      .catch(err => {
        console.log(err)
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

        <div className="row">
          <div className="col-md-9 products">
            <Products products={this.state.products} />
          </div>

          <div className="col-md-3">
            <div className="row" style={{ margin: '10px' }}>
              <div className="col-md-12" style={{ textAlign: 'center' }}>
                <h6>Cart <span className="badge badge-primary badge-pill">0</span></h6>
                <small>{this.state.searchName}</small>
                <h3>
                  <a href="#tambah" className="badge badge-pill badge-warning" data-toggle="modal">
                    <i className="material-icons">add</i>
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade" id="tambah" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Add Menu</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
                  <div className="form-group">
                    <input placeholder="Product Name..." class="form-control" type="text" name="name" onChange={this.onChangeHandler}></input>
                  </div>
                  <div className="form-group">
                    <label>Image:</label>
                    <input class="form-control-file" type="file" name="image" onChange={this.handleFileChange}></input>
                  </div>
                  <div className="form-group">
                    <select class="form-control" name="category" onChange={this.onChangeHandler}>
                      <option selected="on" disabled="on">Category...</option>
                      <option value="1">Food</option>
                      <option value="2">Drink</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input placeholder="Price..." class="form-control" type="number" name="price" onChange={this.onChangeHandler}></input>
                  </div>
                  <div className="form-group">
                    <input placeholder="Stock..." class="form-control" type="number" name="stock" onChange={this.onChangeHandler}></input>
                  </div>
                  <button type="submit" className="btn btn-primary">Send</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
