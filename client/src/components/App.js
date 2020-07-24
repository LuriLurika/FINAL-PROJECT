import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AuthService from './../service/AuthService'

import { Switch, Route, Redirect } from 'react-router-dom'


import Index from './pages/Index'
import Navigation from './ui/Navbar'

/***************PRUEBA RUTAS**************/
import Courses from './pages/Curses'
import Subjects from './pages/Subjects/subjects'
import Teachers from './pages/pruebarutas/teachers'
import Users from './pages/pruebarutas/users'
import Sidebar from './ui/Sidebar'
import Profile from './pages/Profile/index'





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
          <main contenteditable>
          <Route exact path="/" render={() => <Index />} />
          <Route path="/courses" render={() => <Courses />} />
          <Route path="/subjects" render={() => <Subjects />} />
          <Route path="/teachers" render={() => <Teachers />} />
          <Route path="/users" render={() => <Users />} />
          <Route path="/profile" render={() => <Profile />} />
          </main>


        </Switch>
       
      </>
    )
  }
}

export default App
