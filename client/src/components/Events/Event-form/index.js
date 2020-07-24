import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EventForm extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            participants: '',
            eventDate: ''
            

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
            .createEvents(this.state)
            .then(() => this.props.handleEventSubmit())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h3>Nuevo Evento</h3>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.title} name="title" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" as="textarea" rows="3"/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Participantes</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.participants} name="participants" type="text" />
                    </Form.Group> {/* Esto debería ser un desplegable de los usuarios existentes */}

                    <Form.Group>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.eventDate} name="eventDate" type="text" />
                    </Form.Group> {/* Ver cómo poner la opción de que despliegue un calendario y se pueda seleccionar */}

                                       
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </>
        )
    }
}

export default EventForm