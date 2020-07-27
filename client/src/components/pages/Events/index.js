import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'

import EventCard from './Event-list/index.js'
import EventForm from '../../common/Forms/Event-form'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from '../../ui/Spinner'

const emptyEvent = {
    id: '',
    title: '',
    description: '',
    eventDate: '',
    eventTime: ''
}

class Events extends Component {
    constructor (props){
        super(props)
        this.state = {
            events: undefined,
            showModal: false,
            selected: emptyEvent
        }

        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => this.updatedEventsList()


    updatedEventsList = () => {
        this.schoolHackApi
            .getAllEvents()
            .then(response => { this.setState({ events: response.data }) })
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })

    handleEventSubmit = (eventInfo) => {
        const action = eventInfo.id
            ? this.schoolHackApi.updateEvent(eventInfo)
            : this.schoolHackApi.createEvents(eventInfo)
        action
            .then(() => {
                this.updatedEventsList();
                this.setState({ showModal: false });
            })
            .catch((err) => console.log("error en create Subject", err));
    };

    render() {
        const {events, showModal, selected}=this.state
        return (
            <>
                
                <Container as="main">
                    <h3>Eventos:</h3>
                    {/*this.props.loggedInUser && */}
                    
                    <Button onClick={() => this.setState({ selected: emptyEvent, showModal: true })}><FontAwesomeIcon icon={faPlus}/></Button>
                    

                    {
                        !this.state.events ? <h3><Spinner/></h3> :

                            <Row>
                                {this.state.events.map(elm => <EventCard key={elm._id} {...elm} />)}
                            </Row>

                    }
                </Container>

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EventForm
                          role="DIRECTOR, TEACHER"  
                          title= {selected.title}
                          description= {selected.description}
                          participants= {selected.participants}
                          eventDate={selected.eventDate}
                          eventTime={selected.eventTime}
                          onEventChanged={this.handleEventSubmit}
                        />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Events
