import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/redux/store'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'
import Navbar from './components/layout/Navbar'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/dash" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
