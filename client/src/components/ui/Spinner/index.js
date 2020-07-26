import React from 'react'

import Logo from './../../logoverde.png'

import Container from 'react-bootstrap/Row'

import Col from 'react-bootstrap/Col'

import './index.css'

const Spinner = () =>
    <Container className="center-page vh-100">
        <Col>
            <div className="spinner">
                <img src={Logo} alt='logo' />
            </div>
        </Col>
    </Container>
export default Spinner