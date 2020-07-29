import React, { Component } from "react";
import SchoolHackApi from "../../../service/SchoolHackApi";

import EventCard from "../../common/Event-Card/index.js";
import EventForm from "./Event-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "../../ui/Spinner";

const emptyEvent = {
  _id: "",
  title: "",
  description: "",
  eventDate: "",
  eventTime: 0,
  placeId: "",
  placeDescription: "¿En qué lugar?",
};

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canEdit: props.loggedInUser && props.loggedInUser.type === "DIRECTOR",
      events: undefined,
      showModal: false,
      selected: emptyEvent,
    };

    this.schoolHackApi = new SchoolHackApi();
  }

  componentDidMount = () => this.updatedEventsList();

  updatedEventsList = () => {
    this.schoolHackApi
      .getAllEvents()
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch((err) => console.log(err));
  };

  handleModal = (status) => this.setState({ showModal: status });

  handleEventSubmit = (eventInfo) => {
    console.log(eventInfo);
    const action = eventInfo.id
      ? this.schoolHackApi.updateEvent(eventInfo)
      : this.schoolHackApi.createEvents(eventInfo);
    action
      .then(() => {
        this.updatedEventsList();
        this.setState({ showModal: false });
      })
      .catch((err) => console.log("error en create Event", err));
  };

  handleAcceptEvent = (event) => {
    const eventToSave = {
      ...event,
      id: event._id,
      participants: [...event.participants.map(elm=> elm._id), this.props.loggedInUser._id],
    };
    this.schoolHackApi
      .updateEvent(eventToSave)
      .then(() => this.updatedEventsList())
      .catch((err) => console.log(err));
  };
  handleDismissEvent = (event) => {
    const eventToSave = {
      ...event,
      id: event._id,
      participants: event.participants.filter(
        (elm) => elm._id !== this.props.loggedInUser._id
      ).map(elm => elm._id),
    };
    this.schoolHackApi
      .updateEvent(eventToSave)
      .then(() => this.updatedEventsList())
      .catch((err) => console.log(err));
  };
  handleDelete = (eventId) => {
    this.schoolHackApi
      .deleteEvent(eventId)
      .then(() => this.updatedEventsList())
      .catch((err) => console.log("error al eliminar Event", err));
  };
  handleEdit = (eventId) => {
    this.setState({
      selected: this.state.events.find((elm) => elm._id === eventId),
      showModal: true,
    });
  };
  render() {
    const { selected, canEdit } = this.state;
    return (
      <>
        <Container as="main">
          <h3>Eventos:</h3>

          {canEdit && (
            <Button
              onClick={() =>
                this.setState({ selected: emptyEvent, showModal: true })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          )}

          {!this.state.events ? (
            <h3>
              <Spinner />
            </h3>
          ) : (
            <Row>
              {this.state.events.map((elm) => (
                <EventCard
                  key={elm._id}
                  {...elm}
                  canEdit={canEdit}
                  currentUserLoggedId={this.props.loggedInUser._id}
                  onHandleDelete={this.handleDelete}
                  onHandleEdit={this.handleEdit}
                  onAcceptEvent={() => this.handleAcceptEvent(elm)}
                  onDismissEvent={() => this.handleDismissEvent(elm)}
                />
              ))}
            </Row>
          )}
        </Container>

        <Modal
          size="lg"
          show={this.state.showModal}
          onHide={() => this.handleModal(false)}
        >
          <Modal.Body>
            <EventForm
              role="DIRECTOR, TEACHER"
              title={selected.title}
              description={selected.description}
              participants={selected.participants}
              eventDate={selected.eventDate}
              eventTime={selected.eventTime}
              placeId={selected.placeId}
              placeDescription={selected.placeDescription}
              id={selected._id}
              onEventChanged={this.handleEventSubmit}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Events;
