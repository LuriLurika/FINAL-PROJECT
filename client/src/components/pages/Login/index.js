import React, { Component } from 'react'
import AuthService from '../../../service/AuthService'

import Logo from './../../logoverde.png'

import Container from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './index.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.authService
            .login(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                // this.props.handleToast(true, 'Sesión inciada')
                // this.props.history.push('/')
            })
            .catch(err => console.log(err.response.data.message))
    }

    render() {

        return (
            <Container className='vh-100 login-page'>
                <Row className='vh-100 vw-100 login-page'>
                    <Col md={7} className='lft-box'>
                        <Row className='flex-end'>
                            <Col>
                                <img src={Logo} alt="Logo" />
                            </Col>
                            <Col className="lft-box-text">
                                <h1 className='logo-letter'>LEL School</h1>
                                <h2 className='amatic-letter'>Gestión Escolar</h2>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Col className='form-login'>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                </Form.Group>

                                <Button variant="dark" type="submit">Iniciar sesión</Button>
                            </Form>
                        </Col>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default Login