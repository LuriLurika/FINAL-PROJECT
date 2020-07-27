import React, { Component } from 'react'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: ['09:00 - 10:00', '10:00 - 11:00', '12:00 - 13:00', '14:30 - 15:30', '15:30 - 16:30'],
            title: props.title,
            description: props.description,
            participants: [],
            eventDate: props.eventDate,
            eventTime: props.eventTime
        }
    }

    handleInputChange = e => {
        const { name, value } = e.target
        console.log(e.target.value, name)
        this.setState({ [name]: value })
    }

    handleTime = e => {
        const { value } = e.target
        this.setState({ eventTime: value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(this.state)
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            this.props.onEventChanged({
                ...this.state,
                eventTime: this.state.time[this.state.eventTime]
            });
        }
        this.setState({ validated: true });
    };

    render() {
        return (
            <>
                <h3>Nuevo Evento</h3>
                <hr></hr>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.title} name="title" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" as="textarea" rows="3"/>
                    </Form.Group>
                  

                    <Form.Group>
                        <Form.Label>Fecha  </Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.eventDate} name="eventDate" type="text" />
                    </Form.Group> {/* Ver cómo poner la opción de que despliegue un calendario y se pueda seleccionar */}

                    <Form.Group>
                        <Form.Label>Hora  </Form.Label>
                        <Form.Control required as="select" name="evenTime" onChange={this.handleTime} value={this.state.eventTime}>
                            {this.state.time.map((elm, inx) => <option key={elm} value={inx}> {elm} </option>)}
                        </Form.Control>
                    </Form.Group>
                                       
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </>
        )
    }
}

export default EventForm