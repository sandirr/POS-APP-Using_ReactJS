import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ background: 'white' }} >
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">IrsandiCafe</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a
                                className={props.nav_food}
                                href="/food"
                                onClick={this.changeNavFood}
                            >
                                Food
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className={props.nav_drink}
                                href="/drink"
                            >
                                Drink
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="/drink"
                            >
                                Admin
                            </a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
            </div>
        </nav >
    )
}

export default Navbar