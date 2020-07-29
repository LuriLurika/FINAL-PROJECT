import React, { Component } from "react";
import ProfileDetail from "./components/profileDetail";
import "./index.css";
import HeaderProfile from "./components/headerProfile";
import Messages from "./components/messages";
import Events from "./components/events";
import SchoolHackApi from "../../../service/SchoolHackApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Profile extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      user: prop.loggedInUser,
      unreadMessages: 0,
      showModal: false,
      events: [],
    };
    this.schoolHackApi = new SchoolHackApi();
  }
  componentDidMount = () => {
    this.getEvents();
    this.getPendingMessages(this.state.user._id);
  };
  handleModal = (status) => this.setState({ showModal: status });

  getPendingMessages = (id) => {
    this.schoolHackApi.getAllReceivedMessages(id).then((response) => {
      this.setState({
        unreadMessages: response.data.filter((elm) => !elm.readed).length,
      });
    });
  };
  getEvents = () => {
    this.schoolHackApi
      .getAllEvents()
      .then((response) =>
        this.setState({
          events: response.data.filter((elm) =>
            elm.participants.some(
              (participant) => participant._id === this.state.user._id
            )
          ),
        })
      );
  };

  handleAcceptEvent = (event) => {
    const eventToSave = {
      ...event,
      id: event._id,
      participants: [
        ...event.participants.map((elm) => elm._id),
        this.props.loggedInUser._id,
      ],
    };
    this.schoolHackApi
      .updateEvent(eventToSave)
      .then(() => this.getEvents())
      .catch((err) => console.log(err));
  };

  handleDismissEvent = (event) => {
    const eventToSave = {
      ...event,
      id: event._id,
      participants: event.participants
        .filter((elm) => elm._id !== this.props.loggedInUser._id)
        .map((elm) => elm._id),
    };
    this.schoolHackApi
      .updateEvent(eventToSave)
      .then(() => this.getEvents())
      .catch((err) => console.log(err));
  };

  render() {
    const { user, unreadMessages, events } = this.state;
    return (
      <Container>
        <HeaderProfile profileImg={user.profileImg} name={user.name} />
        <Row as="section">
          <Col md={6}>
            <ProfileDetail
              profileImg={user.profileImg}
              name={user.name}
              lastname={user.lastname}
              email={user.email}
              parents={user.parents}
            />
          </Col>
          <Col md={6}>
            <Messages unreadMessages={unreadMessages} />
            <Events
              currentUserLoggedId={user._id}
              events={events}
              onAcceptEvent={this.handleAcceptEvent}
              onDismissEvent={this.handleDismissEvent}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
