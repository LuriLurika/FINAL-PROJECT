import React from "react";

import "./message-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faTrashAlt, faReplyAll, faEnvelopeOpen, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

import './index.css'

const ListMail = ({
    onDeleteMessage,
    title,
    body,
    sendedBy,
    readed,
    receivedBy,
    onReplyMessage,
    _id,
}) => {
    return (

        <>

            <Col sm={12}>

                
                <Row className='box-mail'>
                    <Col sm={3}><span className="text-muted">Asunto: </span> {title} </Col>
                    <Col sm={3} className="mb-2"><span className="text-muted">Enviado por: </span>{sendedBy.name}</Col> 
                    <Col sm={3} className="mb-2"><span className="text-muted">Para: </span> {receivedBy.username}</Col>
                    {/* <Col>{body}</Col> */}
                    <Col sm={2}><Link to={`/messages/${_id}`}>{readed ? <FontAwesomeIcon icon={faEnvelopeOpen} /> : <FontAwesomeIcon icon={faEnvelope} />} Leer</Link></Col>
                    <Col sm={1} className='div-icon'>
                        <Link className='email-icon' onClick={() => onDeleteMessage(_id)}><FontAwesomeIcon as='button' icon={faTrashAlt} /></Link> |
                        <Link className='email-icon' onClick={() => onReplyMessage(_id, sendedBy, title)}><FontAwesomeIcon as='button' icon={faReplyAll} /></Link>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default ListMail;