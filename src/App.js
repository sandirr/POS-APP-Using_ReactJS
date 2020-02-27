import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Products from './components/pages/Products'
import Login from './components/Login'

class App extends Component {
  

  render() {
    return (
      <Router>
        <Route path="/" exact component={Products} />
        <Route path="/login" component={Login}/>
      </Router>
    )
  }
}

export default App
