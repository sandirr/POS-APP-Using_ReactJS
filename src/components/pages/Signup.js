import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Home.css'

class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.password !== this.state.password2) return alert('Check your password/retype password')
        axios
            .post("http://localhost:8181/user/register/", this.state)
            .then(res => {
                this.props.history.push('/login')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div className="secure-img"></div>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-8">
                            <h4 style={{ margin: '20px auto' }}>Signup</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input required type="text" className="form-control" placeholder="Enter email" name="name" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input required type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input required type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label>Retype Password</label>
                                    <input required type="password" className="form-control" placeholder="Enter password" name="password2" onChange={this.onChange} />
                                </div>
                                <Link to="/login" style={{ float: 'left' }}>Already have an account?</Link>
                                <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup
