import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'

import MessageCard from './message-card'
import MessageForm from '../Message-form'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class MessageList extends Component {
    constructor (props){
        super(props)
        this.state = {
            messages: undefined,
            showModal: false
        }

        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => this.updatedMessagesList()


    updatedMessagesList = () => {
        this.schoolHackApi
            .getAllMessages()
            .then(response => { this.setState({ messages: response.data }) })
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })

    handleMessagesSubmit = () => {
        this.handleModal(false)
        this.updatedMessagesList()
    }

    render () {
        return (
            <>
                
                <Container as="main">
                    <h3>Mensajes:</h3>
                    {
                        /*this.props.loggedInUser && */<Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Nuevo mesaje</Button>
                    }

                    {
                        !this.state.messages ? <h3>Cargando...</h3> :

                            <Row>
                                {this.state.messages.map(elm => <MessageCard key={elm._id} {...elm} />)}
                            </Row>

                    }
                </Container>

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <MessageForm handleMessagesSubmit={this.handleMessagesSubmit} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default MessageList