import React from "react";

import Button from "react-bootstrap/Button";

import "./message-card.css";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const MessageCard = ({
  onDeleteMessage,
  title,
  body,
  sendedBy,
  receivedBy,
  onReplyMessage,
  _id,
}) => {
  return (
    <Col md={3}>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Enviado por: {sendedBy.name}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Para: {receivedBy.username}
          </Card.Subtitle>
          <Card.Text>{body}</Card.Text>
          <Button
            onClick={() => onDeleteMessage(_id)}
            className="btn btn-dark btn-block btn-sm"
          >
            Eliminar mensaje
          </Button>
          <Button
            onClick={() => onReplyMessage(_id, sendedBy, title)}
            className="btn btn-dark btn-block btn-sm"
          >
            Responder mensaje
          </Button>
          <Link
            to={`/messages/${_id}`}
            className="btn btn-dark btn-block btn-sm"
          >
            Ver mensaje
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MessageCard;
