import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Logo from './../../logoverde.png'

import AuthService from './../../../service/AuthService'

import { Link, NavLink } from 'react-router-dom'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.AuthService = new AuthService()
    }

    logout = () => {
        this.AuthService
            .logout()
            .then(() => {
                this.props.setTheUser(false)
                this.props.handleToast(true, 'Usuario desconectado')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Navbar className='navbar' expand="lg" sticky="top" >
                <Navbar.Brand className='logo-letter'>
                    <Link to="/" className='logo-letter'><img className='logo-img' src={Logo} alt='logo' />LEL School</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto margin-right">

                        {/* <Nav.Link as="span">
                            <NavLink to="/courses">Courses routes</NavLink>
                        </Nav.Link> */}


                        {this.props.loggedInUser ?
                            (<>
                                <Nav.Link as="span">
                                    <NavLink to="/" exact>Inicio</NavLink>
                                </Nav.Link>
                                <Nav.Link as="span">
                                    <span onClick={this.logout}>Cerrar sesión</span>
                                </Nav.Link>
                            </>
                            ) : (
                                <>
                                    <Nav.Link as="span">
                                        <NavLink to="/login">Iniciar sesión</NavLink>
                                    </Nav.Link>
                                </>
                            )
                        }

                        <Nav.Link as="span">
                            <NavLink to="/profile" >Hola, {this.props.loggedInUser ? this.props.loggedInUser.username : 'invitado'}</NavLink>
                        </Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation