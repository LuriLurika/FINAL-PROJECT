import React, { Component } from "react";
import ProfileDetail from './components/profileDetail'
import './index.css'
import HeaderProfile from './components/headerProfile'
import Messages from './components/messages'
import Events from './components/events'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Profile extends Component {

    constructor() {
        super()
        this.state = {
            user: undefined,
            showModal: false
        };
    }

    handleModal = status => this.setState({ showModal: status })



    render() {
        return (
            <Container>
                <HeaderProfile />
                <Row as="section">
                    <Col md={6}>
                        <ProfileDetail name='NOMBRE' lastname='APELLIDO' email='EA@GMAIL.COM' />

                    </Col>
                    <Col md={6}>
                        <Messages />
                        <Events />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Profile
