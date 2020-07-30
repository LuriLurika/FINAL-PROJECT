import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit} from "@fortawesome/free-solid-svg-icons";
import Col from 'react-bootstrap/Col'


const ProfileDetail = ({ name, lastname, email, onViewForm }) => {

    return (
        <Col className="blue">

            <h3>Tus datos</h3> <Button onClick={() => onViewForm()}><FontAwesomeIcon icon={faUserEdit} /></Button> 
            <p>nombre: {name}</p>
            <p>apellidos: {lastname}</p>
            <p>nombre: {email}</p>
        


        </Col>

    )
}


export default ProfileDetail