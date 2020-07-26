import React, { Component } from 'react'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class MessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            message: {
                id: props.id,
                title: props.title,
                body: props.body,
                receivedBy: props.receivedBy
            },
            validated: false,
        }
        
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({
            message: {...this.state.message,
                [name]: value
                }
        })
    }

   handleSubmit = e => {
       e.preventDefault()
       const form = e.currentTarget
       const { message } = this.state
           if (form.checkValidity() === false) {
               e.stopPropagation()
           } else {
               this.props.onMessageChanged(message)
           }
           this.setState({validated: true })
           }
               
                       

    render() {
        const { message, validated } = this.state
        return (
            <>
                <h3>Nuevo Mensaje</h3>
                <hr></hr>
                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control required onChange={event => this.handleInputChange(event)}  value={message.title} name="title" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control required onChange={event => this.handleInputChange(event)}  value={message.body} name="body" type="text" as="textarea" rows="3"/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Para</Form.Label>
                        <Form.Control as='select' required onChange={event => this.handleInputChange(event)} name="receivedBy" type="text">
                            
                            <option>Hola!</option>
                        
                                {/* {message.map(elm => <option key={elm._id} {...elm}> {elm.username} </option>)} */}
                                
                        </Form.Control>   
                        
                    </Form.Group> {/* Esto debería ser un desplegable de los usuarios existentes */}

                       

                    <Button variant="dark" type="submit">Enviar</Button>
                </Form>
            </>
        )
    }
}

export default MessageForm