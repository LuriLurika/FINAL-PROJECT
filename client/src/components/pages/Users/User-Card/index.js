import React from 'react'

import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const UserCard = ({_id, name, lastname, profileImg,email, deleteUser }) => {


    return (
        <Col md={3}>
            <Card className="user-card">
                <Card.Img variant="top" src={profileImg} />
                <Card.Body>
                    <Card.Title>{lastname}, {name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                    <Link to={`/users/${_id}`} className="btn btn-dark btn-block btn-sm">Ver detalles</Link>
                    <Link to={`/users`}className="btn btn-dark btn-block btn-sm">Eliminar</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default UserCard