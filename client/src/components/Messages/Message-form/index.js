import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class MessageForm extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            body: '',
            receivedBy: '',
            

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
            .createMessages(this.state)
            .then(() => this.props.handleUserSubmit())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h3>Nuevo Mensaje</h3>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.title} name="title" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.body} name="body" type="text" as="textarea" rows="3"/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Para</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.receivedBy} name="receivedBy" type="text" />
                    </Form.Group> {/* Esto debería ser un desplegable de los usuarios existentes */}

                                       
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </>
        )
    }
}

export default MessageForm