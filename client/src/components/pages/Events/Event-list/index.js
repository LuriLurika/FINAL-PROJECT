import React from 'react'

import { Link } from 'react-router-dom'

import './event-card.css'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'


const EventCard = ({ _id, title, description, creator, participants, eventDate }) => {


    return (
        <Col md={3}>
            <Card >
                
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Cuando? {eventDate} </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Creado por: {creator.name}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Invitados: </Card.Subtitle>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{participants.name}</ListGroupItem>
                        </ListGroup>
                    <Card.Text>{description}</Card.Text>
                    <Link to={`/user/${_id}`} className="btn btn-dark btn-block btn-sm">Eliminar evento</Link> {/*No funciona*/}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default EventCard