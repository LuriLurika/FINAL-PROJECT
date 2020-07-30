import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import './../index.css'


const ProfileDetail = ({ name, lastname, email, onViewForm, profileImg }) => {

    return (
        <>
            <Row className="flex-data">
                <h3>Tus datos</h3>

            </Row>

            <Row>
                <Col className='detail-prof' sm={4}>
                    <img src={profileImg} alt="{name}" />
                </Col>
                <Col sm={6}>
                    <p> <span className='text-muted'> Nombre:</span> {name}</p>
                    <p><span className='text-muted'> Apellidos:</span>  {lastname}</p>
                    <p><span className='text-muted'> Email:</span>  {email}</p>
                </Col>
                <Col className='btn-rd' sm={2}>
                    <Button variant="outline-success" onClick={() => onViewForm()}><FontAwesomeIcon icon={faUserEdit} /></Button>
                </Col>
            </Row>



        </>
    )
}


export default ProfileDetail