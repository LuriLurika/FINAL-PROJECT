import React, { Component } from 'react'
import AuthService from '../../../service/AuthService'

import Logo from './../../logoverde.png'

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
            <div className='container center-grid login-page vh-100
            
            '>
                <div className='row'>
                    <div className='lft-box col-8'>
                        <div className='d-flex flex-end'>

                            <img src={Logo} alt="Logo" />

                            <div className="lft-box-text">
                                <h1 className='logo-letter'>LEL School</h1>
                                <h2 className='amatic-letter'>Gestión Escolar</h2>
                            </div>
                        </div>
                    </div>
                    <div className='right-box col-4'>
                        <div className='form-login'>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group className='form-group' controlId="formBasicEmail">
                                    <Form.Control className='form-control' onChange={this.handleInputChange} value={this.state.username} name="username" type="text" placeholder="Usuario" />
                                    <Form.Label className='form-label' >Usuario</Form.Label>

                                </Form.Group>

                                <Form.Group className='form-group' controlId="formBasicPassword">
                                    <Form.Control className='form-control' onChange={this.handleInputChange} value={this.state.password} name="password" type="password" placeholder="Contraseña" />
                                    <Form.Label className='form-label' >Contraseña</Form.Label>
                                </Form.Group>

                                <Button className='btn-line' type="submit"><span>Iniciar sesión</span></Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

            
        )
    }
}

export default Login