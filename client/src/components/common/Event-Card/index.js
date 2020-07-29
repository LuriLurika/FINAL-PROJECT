import React from "react";

import "./event-card.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

import Map from "../Maps";

const EventCard = ({
  placeId,
  canEdit,
  onHandleDelete,
  onHandleEdit,
  _id,
  title,
  description,
  participants,
  eventDate,
  currentUserLoggedId,
  onAcceptEvent,
  onDismissEvent,
}) => {
  return (
    <Col md={3}>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Body>
            <Map visibleAddress={false} placeId={placeId} />
          </Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Fecha {eventDate.substring(0, 10)}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <div>
              <span>Participantes: {participants.length}</span>
              {!participants.some((elm) => elm._id === currentUserLoggedId) && (
                <Button onClick={onAcceptEvent}>
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              )}
              {participants.some((elm) => elm._id === currentUserLoggedId) && (
                <Button onClick={onDismissEvent}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              )}
            </div>
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>

          {canEdit && (
            <>
              <Button onClick={() => onHandleDelete(_id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
              <Button onClick={() => onHandleEdit(_id)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
