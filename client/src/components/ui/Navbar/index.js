import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";

import ModalLogin from "./components/modal";
import Logo from "./../../logoverde.png";
import AuthService from "./../../../service/AuthService";

import { Link, NavLink } from "react-router-dom";

import "./index.css";


class Navigation extends Component {

  constructor(props) {

    super(props);
    this.state = {
      showModal: false,
      about: false,
    };


    this.AuthService = new AuthService();

    this.modalInfo = {
      about: {
        title: "¿Quiénes somos?",
        body: "Somos tres jóvenes y bellas programadoras. Lorem fistrum benemeritaar no te digo trigo por no llamarte Rodrigor mamaar fistro sexuarl a peich. Sexuarl mamaar va usté muy cargadoo se calle ustée ese pedazo de se calle ustée qué dise usteer fistro ese hombree de la pradera llevame al sircoo. Te voy a borrar el cerito tiene musho peligro te voy a borrar el cerito fistro llevame al sircoo amatomaa torpedo por la gloria de mi madre ese hombree. A wan quietooor al ataquerl diodeno. Ese que llega a gramenawer a wan me cago en tus muelas se calle ustée la caidita a peich quietooor llevame al sircoo al ataquerl al ataquerl.",
      },
      contact: {
        title: "Contacta con nosotros",
        body: "A través de nuesto emai info.lelschool@gmail.com",
      },
    };
  }
  handleModal(status, info) {
    this.setState({ showModal: status, about: info === "about" });
  }
  logout = () => {
    this.AuthService.logout()
      .then(() => {
        this.props.setTheUser(false);
        this.props.handleToast(true, "Usuario desconectado");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <>
        <Navbar className="navbar" expand="lg" sticky="top">
          <Navbar.Brand className="logo-letter">
            <Link to="/" className="logo-letter">
              <img className="logo-img" src={Logo} alt="logo" />
              LEL School
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav nav-collapse">
            <Nav className="ml-auto inside-nav-collapse">
              {this.props.loggedInUser ? (
                <>
                  <Nav.Link as="span">
                    <NavLink to="/profile" exact>
                      Inicio
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link as="span">
                    <NavLink
                      to="/login"
                      onClick={this.logout}>
                      Cerrar sesión
                    </NavLink>
                  </Nav.Link>
                </>
              ) : (
                  <>
                    <Nav.Link as="span">
                      <NavLink
                        to="#"
                        onClick={() => {
                          this.handleModal(true, "about");
                        }}
                      >
                        ¿Quiénes somos?
                    </NavLink>
                    </Nav.Link>
                    <Nav.Link as="span">
                      <NavLink
                        to="#"
                        onClick={() => {
                          this.handleModal(true, "contact");
                        }}
                      >
                        Contacta con nosotros
                    </NavLink>
                    </Nav.Link>
                  </>
                )}
              <Nav.Link as="span">
                <NavLink to="/profile">
                  Hola,
                  {this.props.loggedInUser
                    ? " " + this.props.loggedInUser.username
                    : " invitado"}
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showModal}
          onHide={() => this.handleModal(false)}
        >
          {this.state.about ? (
            <ModalLogin {...this.modalInfo.about} />
          ) : (
              <ModalLogin {...this.modalInfo.contact} />
            )}
        </Modal>
      </>
    );
  }
}
export default Navigation;
