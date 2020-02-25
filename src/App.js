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
      formStatus: 'Add',
      productIdSelected: null,

      searchName: '',
      totalPages: [],
      activePage: 1,
      limit: 6,
      activeCategory: ''
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
      activeCategory: event.target.id
    })

    if (event.target.id === '') this.setState({ activeCategory: '' })

    axios
      .get(`http://localhost:8181/product/?category=${event.target.id}&limit=${this.state.limit}`)
      .then(res => {
        this.setState({
          products: res.data.result,
          totalPages: res.data.totalPages
        })
        console.log(res.data.totalPages)
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
      .get(`http://localhost:8181/product/?name=${event.target.value}&limit=${this.state.limit}`)
      .then(res => {
        this.setState({
          products: res.data.result,
          totalPages: res.data.totalPages
        })
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
    this.setState({
      name: '',
      image: '',
      category: 0,
      price: '-',
      stock: '-'
    })
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
        alert('Menu updated')
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
        alert('Menu added')
        this.componentDidMount()
      })
  }

  // close button
  closeButtonHandler = () => {
    document.querySelector('.overlay .card').style.zIndex = -1
    document.querySelector('.overlay .card').style.opacity = 0
    document.querySelector('.overlay .card').style.right = '-350px'
  }

  // add button
  addButtonHandler = () => {
    this.setState({
      formStatus: 'Add',
      name: '',
      image: '',
      category: 0,
      price: '-',
      stock: '-'
    })
    document.querySelector('.overlay .card').style.zIndex = 9999
    document.querySelector('.overlay .card').style.opacity = 1
    document.querySelector('.overlay .card').style.right = '4px'
  }

  // edit button
  editButtonHandler = (product) => {
    document.querySelector('.overlay .card').style.zIndex = 9999
    document.querySelector('.overlay .card').style.opacity = 1
    document.querySelector('.overlay .card').style.right = '4px'

    if (product.category === 'Food') {
      this.setState({ category: 1 })
    }
    if (product.category === 'Drink') {
      this.setState({ category: 2 })
    }
    this.setState({
      image: '',
      name: product.name,
      price: product.price,
      stock: product.stock,
      productIdSelected: product.id,
      formStatus: 'Edit'
    })
  }

  // delete button
  deleteButtonHandler = (productId) => {
    const options = {
      method: "DELETE"
    }
    fetch(`http://localhost:8181/product/${productId}`, options)
      .then(res => {
        console.log(res)
        this.componentDidMount()
      })
      .catch(err => {
        console.log(err)
      })
  }

  // change page
  onChangePage = (event) => {
    event.preventDefault()

    let allPage = document.querySelectorAll('.pagination button.page-link')
    allPage.forEach(e => {
      e.parentElement.classList.remove('active')
    })
    event.target.parentElement.classList.add('active')
    this.setState({ activePage: event.target.value })
    axios
      .get(`http://localhost:8181/product/?limit=${this.state.limit}&page=${event.target.value}&category=${this.state.activeCategory}&name=${this.state.searchName}`)
      .then(res => {
        this.setState({
          products: res.data.result,
          totalPages: res.data.totalPages
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8181/product/?name=${this.state.searchName}&limit=${this.state.limit}&page=${this.state.activePage}&category=${this.state.activeCategory}`)
      .then(res => {
        this.setState({
          products: res.data.result,
          totalPages: res.data.totalPages
        })
      })
      .catch(err => {
        console.log(err)
      })
  }



  render() {
    return (
      <div>
        {/* Products */}
        <div className="row">
          <div className="col-md-9 ">

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
                      <a className="nav-link" id="" href="/drink" name="all_class" onClick={this.onClickMenu}>Admin</a>
                    </li>
                  </ul>
                  <form className="form-inline my-3 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.onChangeSearch} />
                  </form>
                </div>
              </div>
            </nav >



            <div className="row products">
              <h3 className="add" onClick={this.addButtonHandler}>
                <button className="badge badge-pill btn btn-primary">
                  <i className="material-icons">library_add</i>
                </button>
              </h3>
              {this.state.products.map((product, index) =>
                <div className="product-card col-md-6 col-lg-4" key={product.id}>
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
                        <button onClick={() => this.deleteButtonHandler(product.id)} className="card-link btn btn-small btn-outline-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination */}
              <div className="col-md-12">
                <ul className="pagination justify-content-center">
                  {this.state.totalPages.map(page =>
                    <li className="page-item" key={page}>
                      <button className="page-link" value={page} onClick={this.onChangePage}>{page}</button>
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </div>

          {/* Cart */}
          <div className="col-md-3">
            <div className="row" style={{ paddingRight: '5%' }}>
              <div className="col-md-12" style={{ textAlign: 'center', position: 'relative', marginTop: '20px' }}>
                <h6 style={{ borderBottom: '2px solid rgba(0,0,0,.2)', height: '38px' }}>Cart
                <span className="badge badge-primary badge-pill">0</span></h6>


                <ul class="list-group" style={{height:'200px', overflow:'auto'}}>

                  <li class="list-group-item" style={{ padding: '0', border: 'none' }}>
                    <div className="media" style={{ textAlign: 'left' }}>
                      <img style={{ width: '64px', height: '60px' }} src="https://www.bigstockphoto.com/images/homepage/module-2.jpg" className="mr-3" alt="..." />
                      <div className="media-body">
                        <h6 className="mt-0">Media heading</h6>
                        <span style={{ position: 'relative', top: '-6px' }}>
                          <button className="btn btn-primary btn-sm">-</button>
                          <button className="btn cartStock">5</button>
                          <button className="btn btn-primary btn-sm">+</button>
                        </span>
                        <span style={{ float: 'right' }} className="cartPrice">Rp. 50000</span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item" style={{ padding: '0', border: 'none' }}>
                    <div className="media" style={{ textAlign: 'left' }}>
                      <img style={{ width: '64px', height: '60px' }} src="https://www.bigstockphoto.com/images/homepage/module-2.jpg" className="mr-3" alt="..." />
                      <div className="media-body">
                        <h6 className="mt-0">Media heading</h6>
                        <span style={{ position: 'relative', top: '-6px' }}>
                          <button className="btn btn-primary btn-sm">-</button>
                          <button className="btn cartStock">5</button>
                          <button className="btn btn-primary btn-sm">+</button>
                        </span>
                        <span style={{ float: 'right' }} className="cartPrice">Rp. 50000</span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item" style={{ padding: '0', border: 'none' }}>
                    <div className="media" style={{ textAlign: 'left' }}>
                      <img style={{ width: '64px', height: '60px' }} src="https://www.bigstockphoto.com/images/homepage/module-2.jpg" className="mr-3" alt="..." />
                      <div className="media-body">
                        <h6 className="mt-0">Media heading</h6>
                        <span style={{ position: 'relative', top: '-6px' }}>
                          <button className="btn btn-primary btn-sm">-</button>
                          <button className="btn cartStock">5</button>
                          <button className="btn btn-primary btn-sm">+</button>
                        </span>
                        <span style={{ float: 'right' }} className="cartPrice">Rp. 50000</span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item" style={{ padding: '0', border: 'none' }}>
                    <div className="media" style={{ textAlign: 'left' }}>
                      <img style={{ width: '64px', height: '60px' }} src="https://www.bigstockphoto.com/images/homepage/module-2.jpg" className="mr-3" alt="..." />
                      <div className="media-body">
                        <h6 className="mt-0">Media heading</h6>
                        <span style={{ position: 'relative', top: '-6px' }}>
                          <button className="btn btn-primary btn-sm">-</button>
                          <button className="btn cartStock">5</button>
                          <button className="btn btn-primary btn-sm">+</button>
                        </span>
                        <span style={{ float: 'right' }} className="cartPrice">Rp. 50000</span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item" style={{ padding: '0', border: 'none' }}>
                    <div className="media" style={{ textAlign: 'left' }}>
                      <img style={{ width: '64px', height: '60px' }} src="https://www.bigstockphoto.com/images/homepage/module-2.jpg" className="mr-3" alt="..." />
                      <div className="media-body">
                        <h6 className="mt-0">Media heading</h6>
                        <span style={{ position: 'relative', top: '-6px' }}>
                          <button className="btn btn-primary btn-sm">-</button>
                          <button className="btn cartStock">5</button>
                          <button className="btn btn-primary btn-sm">+</button>
                        </span>
                        <span style={{ float: 'right' }} className="cartPrice">Rp. 50000</span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item" style={{ padding: '0', border: 'none' }}>
                    <div className="media" style={{ textAlign: 'left' }}>
                      <img style={{ width: '64px', height: '60px' }} src="https://www.bigstockphoto.com/images/homepage/module-2.jpg" className="mr-3" alt="..." />
                      <div className="media-body">
                        <h6 className="mt-0">Media heading</h6>
                        <span style={{ position: 'relative', top: '-6px' }}>
                          <button className="btn btn-primary btn-sm">-</button>
                          <button className="btn cartStock">5</button>
                          <button className="btn btn-primary btn-sm">+</button>
                        </span>
                        <span style={{ float: 'right' }} className="cartPrice">Rp. 50000</span>
                      </div>
                    </div>
                  </li>
  
                </ul>

              </div>
            </div>
          </div>
        </div>

        {/* overlay:form */}
        <div className="overlay">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{this.state.formStatus} Menu</h5>
              <hr />
              <form encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
                <div className="input-group mb-3">
                  <input value={this.state.name} required className="form-control" type="text" name="name" onChange={this.onChangeHandler}></input>
                  <div class="input-group-append">
                    <span class="input-group-text">Name</span>
                  </div>
                </div>
                <div className="input-group mb-3" >
                  <input style={{ border: 'none' }} className="form-control" type="file" name="image" onChange={this.handleFileChange}></input>
                  <div class="input-group-append">
                    <span class="input-group-text">Image</span>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <select className="form-control" value={this.state.category} required name="category" onChange={this.onChangeHandler}>
                    <option selected value={0} disabled="true">Choose category</option>
                    <option value={1}>Food</option>
                    <option value={2}>Drink</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Rp.</span>
                  </div>
                  <input required value={this.state.price} className="form-control" type="number" name="price" onChange={this.onChangeHandler}></input>
                  <div class="input-group-append">
                    <span class="input-group-text">Price</span>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input value={this.state.stock} required className="form-control" type="number" name="stock" onChange={this.onChangeHandler}></input>
                  <div class="input-group-append">
                    <span class="input-group-text">Stock</span>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Send &raquo;</button>
                <button type="reset" className="btn btn-danger" onClick={this.closeButtonHandler} style={{ float: 'right' }}>Close</button>
              </form>
            </div>
          </div>
        </div>


      </div >
    )
  }
}

export default App
