import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            food_class: 'nav-link a',
            drink_class: 'nav-link a',
            all_class: 'nav-link active a',
            isDisabled: false,
            checkoutDisabled: true,
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
            activeCategory: '',

            purchases: [],
            totalPayment: 0,
            cartPrice: [],

            sort: 'ASC',
            by: 'id'
        }
    }

    onSort = (e) => {
        this.setState({ sort: e.target.id })
        axios
            .get(`http://localhost:8181/product/?sort=${e.target.id}&limit=${this.state.limit}&category=${this.state.activeCategory}&by=${this.state.by}`)
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
    onBy = (e) => {
        this.setState({ by: e.target.id })
        axios
            .get(`http://localhost:8181/product/?sort=${this.state.sort}&limit=${this.state.limit}&category=${this.state.activeCategory}&by=${e.target.id}`)
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

    // When nav clicked
    onClickMenu = (event) => {
        this.setState({
            all_class: 'nav-link a',
            food_class: 'nav-link a',
            drink_class: 'nav-link a',
            [event.target.name]: 'nav-link active a',
            activeCategory: event.target.id
        })

        if (event.target.id === '') this.setState({ activeCategory: '' })

        axios
            .get(`http://localhost:8181/product/?category=${event.target.id}&limit=${this.state.limit}&sort=${this.state.sort}&by=${this.state.by}`)
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
            all_class: 'nav-link active a',
            food_class: 'nav-link a',
            drink_class: 'nav-link a',
            searchName: event.target.value
        })
        axios
            .get(`http://localhost:8181/product/?name=${event.target.value}&limit=${this.state.limit}&sort=${this.state.sort}&by=${this.state.by}`)
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
        this.setState({ isDisabled: true })
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
                this.setState({ isDisabled: false })
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
                this.setState({ isDisabled: false })
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
            .get(`http://localhost:8181/product/?limit=${this.state.limit}&page=${event.target.value}&category=${this.state.activeCategory}&name=${this.state.searchName}&sort=${this.state.sort}&by=${this.state.by}`)
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

    onLogout = () => {
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        this.props.history.push('/login');
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login');
        }
        axios
            .get(`http://localhost:8181/product/?name=${this.state.searchName}&limit=${this.state.limit}&page=${this.state.activePage}&category=${this.state.activeCategory}&sort=${this.state.sort}&by=${this.state.by}`)
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

    setChart = (product) => {
        var purchases
        if (this.state.purchases.length === 0) {
            purchases = [...this.state.purchases]
            purchases.push(product)
            this.setState({
                purchases,
                checkoutDisabled: false
            })
        }
        else {
            if (this.state.purchases.indexOf(product) < 0) {
                purchases = [...this.state.purchases]
                purchases.push(product)
                this.setState({ purchases })
            }
            else {
                alert('Already in cart')
            }
        }
    }

    manipulatingCartStock = (e) => {
        e.preventDefault()
        if (e.target.id === 'add-stock') {
            let cartStock = parseInt(e.target.previousElementSibling.innerHTML)
            e.target.previousElementSibling.innerHTML = cartStock + 1
            let cartPrice = parseInt(e.target.nextElementSibling.id)
            e.target.nextElementSibling.innerHTML = (cartStock + 1) * cartPrice

        }
        else if (e.target.id === 'reduce-stock' && parseInt(e.target.nextElementSibling.innerHTML) > 1) {
            let cartStock = parseInt(e.target.nextElementSibling.innerHTML)
            e.target.nextElementSibling.innerHTML = cartStock - 1
            let cartPrice = parseInt(e.target.nextElementSibling.nextElementSibling.nextElementSibling.id)
            e.target.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = (cartStock - 1) * cartPrice
        }
        else {
            alert('can`t reduce anymore')
        }
    }

    checkOut = () => {
        var a = 0
        var cartPrice = [...this.state.cartPrice]
        document.querySelectorAll('.cartPrice').forEach(e => {
            a += parseInt(e.innerHTML)
            cartPrice.push(parseInt(e.innerHTML))
            this.setState({ cartPrice })
        })

        this.setState({
            totalPayment: a
        })
    }

    resetCart = () => {
        this.setState({
            purchases: [],
            totalPayment: 0,
            cartPrice: [],
            checkoutDisabled: true
        })
    }

    printReceipt = () => {
        var halo = document.querySelector('#exampleModal').innerHTML
        document.body.innerHTML = halo
        window.print()
        this.setState({
            purchases: [],
            totalPayment: 0,
            cartPrice: []
        })
        window.location.reload()
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
                                <Link className="navbar-brand" id="" name="all_class" onClick={this.onClickMenu} to="/">IrsandiCafe</Link>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                        <li className="nav-item">
                                            <Link className={this.state.all_class} id="" name="all_class" onClick={this.onClickMenu} to="/">All</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={this.state.food_class} id="food" name="food_class" onClick={this.onClickMenu} to="/">Food</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={this.state.drink_class} id="drink" name="drink_class" onClick={this.onClickMenu} to="/">Drink</Link>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Sort
                                            </Link>
                                            <div className="dropdown-menu" >
                                                <Link className="dropdown-item" onClick={this.onSort} id="ASC" to="#">Ascending</Link>
                                                <Link className="dropdown-item" onClick={this.onSort} id="DESC" to="#">Descending</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                By
                                            </Link>
                                            <div className="dropdown-menu" >
                                                <Link className="dropdown-item" onClick={this.onBy} id="name" to="#">Name</Link>
                                                <Link className="dropdown-item" onClick={this.onBy} id="price" to="#">Price</Link>
                                            </div>
                                        </li>


                                        <li className="nav-item">
                                            <Link className="nav-link a" to="/login" id="" name="all_class" onClick={this.onLogout}>Logout</Link>
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
                                        <button className="img-handle" onClick={() => this.setChart(product)}>
                                            <img src={product.image} className="card-img-top" alt="" />
                                        </button>
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
                        <div className="row" style={{ paddingRight: '5%', boxSizing: 'border-box' }}>
                            <div className="col-md-12" style={{ textAlign: 'center', position: 'relative', top: '20px' }}>
                                <h6 style={{ borderBottom: '2px solid rgba(0,0,0,.2)', height: '38px' }}>Cart
                                <span className="badge badge-primary badge-pill">0</span></h6>


                                <ul className="list-group" style={{ height: '82vh', overflow: 'auto' }}>

                                    {this.state.purchases.map((purchase, index) =>
                                        <li className="list-group-item" style={{ padding: '0', border: 'none' }} key={purchase.id}>
                                            <div className="media" style={{ textAlign: 'left' }}>

                                                <img style={{ width: '64px', height: '60px', borderRadius: '8px' }} src={purchase.image} className="mr-3" alt="..." />

                                                <div className="media-body">
                                                    <h6 className="mt-0 cartName">{purchase.name}</h6>
                                                    <span style={{ position: 'relative', top: '-6px' }}>
                                                        <button className="btn btn-outline-primary btn-sm" id="reduce-stock" onClick={this.manipulatingCartStock}>-</button>

                                                        <button className="btn cartStock">1</button>

                                                        <button className="btn btn-outline-primary btn-sm" id="add-stock" onClick={this.manipulatingCartStock}>+</button>
                                                        <span id={purchase.price} style={{ float: 'right' }} className="cartPrice">{purchase.price}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    )}

                                </ul>

                                <button disabled={this.state.checkoutDisabled} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.checkOut} style={{ width: '100%' }}>Checkout</button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* modals:form */}
                <div className="overlay">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{this.state.formStatus} Menu</h5>
                            <hr />
                            <form encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
                                <div className="input-group mb-3">
                                    <input value={this.state.name} required className="form-control" type="text" name="name" onChange={this.onChangeHandler}></input>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Name</span>
                                    </div>
                                </div>
                                <div className="input-group mb-3" >
                                    <input style={{ border: 'none' }} className="form-control" type="file" name="image" onChange={this.handleFileChange}></input>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Image</span>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <select className="form-control" value={this.state.category} required name="category" onChange={this.onChangeHandler}>
                                        <option selected={true} value={0} disabled={true}>Choose category</option>
                                        <option value={1}>Food</option>
                                        <option value={2}>Drink</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Rp.</span>
                                    </div>
                                    <input required value={this.state.price} className="form-control" type="number" name="price" onChange={this.onChangeHandler}></input>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Price</span>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input value={this.state.stock} required className="form-control" type="number" name="stock" onChange={this.onChangeHandler}></input>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Stock</span>
                                    </div>
                                </div>
                                <button type="submit" disabled={this.state.isDisabled} className="btn btn-primary">Send &raquo;</button>
                                <button type="reset" className="btn btn-danger" onClick={this.closeButtonHandler} style={{ float: 'right' }}>Close</button>
                            </form>
                        </div>
                    </div>

                </div >


                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Checkout</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-4">
                                            {this.state.purchases.map(purchase =>
                                                <div key={purchase.id}>{purchase.name}</div>
                                            )}
                                        </div>
                                        <div className="col-md-4 ml-auto">
                                            {this.state.cartPrice.map((p, index) =>
                                                <div key={index}>{p}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginTop: '15px' }}>
                                        <div className="col-md-6">Total Payment: Rp. {this.state.totalPayment}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={this.resetCart} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={this.printReceipt} className="btn btn-primary">Print</button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        )
    }
}

export default Products