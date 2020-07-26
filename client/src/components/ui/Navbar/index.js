import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'

import ModalLogin from './components/modal'

import Logo from './../../logoverde.png'

import AuthService from './../../../service/AuthService'

import { Link, NavLink } from 'react-router-dom'



import './index.css'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            about: {
                title: '¿Quiénes somos?',
                body: 'Somos tal'
            },
            contact: {
                title: 'Contacta con nosotros',
                body: 'A través de la dire...'
            },

        }
        this.AuthService = new AuthService()
    }

    handleModal = status => this.setState({ showModal: status })

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
            <>
                <Navbar className='navbar' expand="lg" sticky="top" >
                    <Navbar.Brand className='logo-letter'>
                        <Link to="/" className='logo-letter'><img className='logo-img' src={Logo} alt='logo' />LEL School</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            {/* <Nav.Link as="span">
                            <NavLink to="/courses">Courses routes</NavLink>
                        </Nav.Link> */}


                            {this.props.loggedInUser ?
                                (<>
                                    <Nav.Link as="span">
                                        <NavLink to="/profile" exact>Inicio</NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <span onClick={this.logout}>Cerrar sesión</span>
                                    </Nav.Link>
                                </>
                                ) : (
                                    <>
                                        <Nav.Link as="span">
                                            <NavLink to="#" onClick={() => { this.handleModal(true) }
                                            }>¿Quiénes somos?</NavLink>
                                        </Nav.Link>
                                        <Nav.Link as="span">
                                            <NavLink to="#">Contacta con nosotros</NavLink>
                                        </Nav.Link>
                                    </>
                                )
                            }

                            <Nav.Link as="span">
                                <NavLink to="/login" >Hola, {this.props.loggedInUser ? this.props.loggedInUser.username : 'invitado'}</NavLink>
                                {/* cambiar link! */}
                            </Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <ModalLogin />
                </Modal>

            </>
        )
    }
}

export default Navigation