import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./../service/AuthService";

import { Switch, Route, Redirect } from "react-router-dom";

import SchoolHackApi from "../service/SchoolHackApi"
import Navigation from "./ui/Navbar";
import Login from "./pages/Login";

import Courses from "./pages/Courses";
import Subjects from "./pages/Subjects";
import Teachers from "./pages/Teacher";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import Events from "./pages/Events";
import Profile from "./pages/Profile/index";
import Sidebar from "./ui/Sidebar";
import Footer from "./ui/Footer";


import MessageDetail from "./pages/MessageDetail";

import CustomToast from './ui/Toast'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null,
      toast: {
        visible: false,
        text: "",
      },
    };
    this.schoolHackApi = new SchoolHackApi();
    this.AuthService = new AuthService();
  }

  componentDidMount = () => this.fetchUser();

  updateUser = (user) => {
    this.schoolHackApi
      .updateUser(user)
      .then((response) => this.setState({ loggedInUser: response.data }))
      .catch((err) => console.log({ err }));
  };
  setTheUser = (user) => {
    this.setState({loggedInUser: user})
  };

  fetchUser = () => {
    this.AuthService.isLoggedIn()
      .then(
        (response) =>
          this.state.loggedInUser === null &&
          this.setState({ loggedInUser: response.data })
      )
      .catch((err) => console.log({ err }));
  };

  handleToast = (visible, text = "") => {
    let toastCopy = { ...this.state.toast };
    toastCopy = { visible, text };
    this.setState({ toast: toastCopy });
  };

  render() {
    return (
      <>
        <Navigation
          setTheUser={this.setTheUser}
          loggedInUser={this.state.loggedInUser}
          handleToast={this.handleToast}
        />
        <Sidebar loggedInUser={this.state.loggedInUser} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              path="/profile"
              render={() =>
                this.state.loggedInUser ? (
                  <Profile
                    setTheUser={this.updateUser}
                    loggedInUser={this.state.loggedInUser}
                    handleToast={this.handleToast}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  setTheUser={this.setTheUser}
                  handleToast={this.handleToast}
                />
              )}
            />
            <Route
              path="/courses"
              render={(props) => (
                <Courses
                  {...props}
                  setTheUser={this.setTheUser}
                  handleToast={this.handleToast}
                />
              )}
            />
            <Route
              path="/subjects"
              render={(props) => (
                <Subjects
                  {...props}
                  setTheUser = {
                    this.setTheUser
                  }
                  loggedInUser = {
                    this.state.loggedInUser
                  }
                  handleToast={this.handleToast}
                />
              )}
            />
            <Route
              path="/teachers"
              render={(props) => (
                <Teachers
                  {...props}
                  setTheUser = {this.setTheUser}
                  loggedInUser = {this.state.loggedInUser}
                  handleToast={this.handleToast}
                />
              )}
            />
            <Route
              exact
              path="/users"
              render={(props) => (
                <Users
                  {...props}
                  setTheUser={this.setTheUser}
                  loggedInUser={this.state.loggedInUser}
                  handleToast={this.handleToast}
                />
              )}
            />

            <Route
              path="/messages/:id"
              render={(props) => (
                <MessageDetail
                  {...props}
                  setTheUser={this.setTheUser}
                  handleToast={this.handleToast}
                />
              )}
            />
            <Route
              path="/messages"
              render={(props) => (
                <Messages
                  {...props}
                  loggedInUser={this.state.loggedInUser}
                  handleToast={this.handleToast}
                />
              )}
            />
            <Route
              path="/events"
              render={(props) => (
                <Events
                  {...props}
                  loggedInUser={this.state.loggedInUser}
                  setTheUser={this.setTheUser}
                  handleToast={this.handleToast}
                />
              )}
            />
          </Switch>
        </main>
        <CustomToast {...this.state.toast} handleToast={this.handleToast} />
        <Footer />
      </>
    );
  }
}

export default App;
