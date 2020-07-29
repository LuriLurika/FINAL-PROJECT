import React from "react";

import "./event-card.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Map from "../../../common/Maps";
import { propTypes } from "react-bootstrap/esm/Image";

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
          <Card.Subtitle className="mb-2 text-muted">Invitados: </Card.Subtitle>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{participants.name}</ListGroupItem>
          </ListGroup>
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
