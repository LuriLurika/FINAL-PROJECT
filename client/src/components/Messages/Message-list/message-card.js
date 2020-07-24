import React from 'react'

import { Link } from 'react-router-dom'

import './message-card.css'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const MessageCard = ({ _id, title, body, sendedBy, receivedBy }) => {


    return (
        <Col md={3}>
            <Card >
                
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Enviado por: {sendedBy.name}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Para: {receivedBy.name}</Card.Subtitle>
                    <Card.Text>{body}</Card.Text>
                    <Link to={`/user/${_id}`} className="btn btn-dark btn-block btn-sm">Eliminar mensaje</Link> {/*No funciona*/}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MessageCard