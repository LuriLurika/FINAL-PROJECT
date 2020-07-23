import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AuthService from './../service/AuthService'

import { Switch, Route, Redirect } from 'react-router-dom'


import Index from './pages/index'
import Navigation from './ui/Navbar'

/***************PRUEBA RUTAS**************/
import Courses from './pages/pruebarutas/courses'
import Subjects from './pages/pruebarutas/subjects'
import Teachers from './pages/pruebarutas/teachers'
import Users from './pages/pruebarutas/users'
import Sidebar from './ui/Sidebar'






class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      toast: {
        visible: false,
        text: ''
      }
    }
    this.AuthService = new AuthService()
  }

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log("El estado de App ha cambiado:", this.state))

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }

  render() {
    return (
      <>
        <Navigation />
        <Sidebar />
        <Switch>
          <Route exact path="/" render={() => <Index />} />
          <Route path="/courses" render={() => <Courses />} />
          <Route path="/subjects" render={() => <Subjects />} />
          <Route path="/teachers" render={() => <Teachers />} />
          <Route path="/users" render={() => <Users />} />



        </Switch>
      </>
    )
  }
}

export default App
