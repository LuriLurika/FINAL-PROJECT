import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AuthService from './../service/AuthService'

import { Switch, Route } from 'react-router-dom'


import Index from './pages/Index'
import Navigation from './ui/Navbar'
import Login from './pages/Login'



/***************PRUEBA RUTAS**************/
import Courses from './pages/Curses'
import Subjects from './pages/Subjects/subjects'
import Teachers from './pages/pruebarutas/teachers'
import Users from './pages/Users'
import Messages from './pages/Messages'
import Events from './pages/Events'
import Sidebar from './ui/Sidebar'
import Profile from './pages/Profile/index'
import UserDetails from './pages/Users/User-details'




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

  handlerUserChange = newUserInfor => {
    this.userServive
      .updateUSer(newUserInfor)
      .then((userSavedFromAPI) =>
        this.setState({ loggedInUser: userSavedFromAPI })
      );
  }
  render() {
    return (
      <>
        <Navigation />
        <Sidebar />
        <Switch>
          
          <main>
            <Route exact path="/" render={() => <Index />} />
            <Route exact path="/login" render={() => <Login onLoginSuccess={userLogged => {
              this.setState({ loggedInUser: userLogged, toast: { visible: true, text: `Bienvenido ${userLogged.name}`} })
            }}/>} />
            <Route path="/courses" render={() => <Courses />} />
            <Route path="/subjects" render={() => <Subjects />} />
            <Route path="/teachers" render={() => <Teachers />} />
            <Route exact path="/users" render={() => <Users />} />

            <Route path="/users/:id" render={ props => <UserDetails {...props}/>} />
            
            <Route path="/profile" render={() => <Profile user={this.state.loggedInUser} onUserChange={newUserInfor =>
              this.handlerUserChange(newUserInfor)} />} />
            <Route path="/messages" render={() => <Messages />} />
            <Route path="/events" render={() => <Events />} />
          </main>
          
        </Switch>

      </>
    )
  }
}

export default App
