import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UserForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            profileImg: '',
            type: '',
            parent:''

        }
        this.schoolHackApi = new SchoolHackApi()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.schoolHackApi
            .createUser(this.state)
            .then(() => this.props.handleUserSubmit())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h3>Nuevo usuario</h3>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                        {/* <Form.Text className="text-muted">Sin faltas de ortografía.</Form.Text> */}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.lastname} name="lastname" type="text" />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.profileImg} name="profileImg" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.type} name="type" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Padre/s</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.parent} name="parent" type="text" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.email} name="email" type="email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="text" />
                    </Form.Group>

                    
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </>
        )
    }
}

export default UserForm