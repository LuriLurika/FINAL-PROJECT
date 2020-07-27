import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'

import MessageCard from './Message-card'
import MessageForm from '../../common/Forms/Message-form'
import Spinner from '../../ui/Spinner'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

class Messages extends Component {
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

    saveMessageInfo = () => {

    }

    
    handleModal = status => this.setState({ showModal: status })

    handleMessagesSubmit = newMessageInfo => {

        this.schoolHackApi.createMessages(newMessageInfo)
            .then(() => {
                this.updatedMessageList()
                this.handleModal(false)
            }).catch(err => console.log('error en createMessages', err))
    }

    render() {
        console.log(this.state.messages)
        return (
            <>
                
                <Container as="main">
                    <h3>Mensajes:</h3>
                    { /*this.props.loggedInUser && */}
                    <Button onClick={() => this.handleModal(true)} size="sm" ><FontAwesomeIcon icon={faEnvelope} /></Button>
                    

                    {
                        !this.state.messages ? <h3><Spinner/></h3> :

                            <Row>
                                {this.state.messages.map(elm => <MessageCard key={elm._id} {...elm} />)}
                            </Row>

                    }
                </Container>

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <MessageForm
                            id=''
                            title=''
                            body=''
                            recievedBy=''
                            onMessageChanged={this.handleMessagesSubmit}  />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Messages
