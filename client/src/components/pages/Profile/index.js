import React, { Component } from "react";
import ProfileDetail from "./components/profileDetail";
import "./index.css";
import UserForm from "../../common/Forms/User-form";
import HeaderProfile from "./components/headerProfile";
import Messages from "./components/messages";
import Events from "./components/events";
import SchoolHackApi from "../../../service/SchoolHackApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

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

  onViewForm = () => {
    this.setState({ showModal: true });
  };

  getEvents = () => {
    this.schoolHackApi.getAllEvents().then((response) =>
      this.setState({
        events: response.data.filter((elm) =>
          elm.participants.some(
            (participant) => participant._id === this.state.user._id
          )
        ),
      })
    );
  };

  handleUsersSubmit = (user) => {

  }

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
    const { user, unreadMessages, events, showModal } = this.state;
    return (
    
        <Container className='profile-page'>
        <HeaderProfile name={user.name} />
        
          <Row className='profile-row'>
            <Col md={5} className='pad  bc-green'>
              <ProfileDetail
                profileImg={user.profileImg}
                name={user.name}
                lastname={user.lastname}
                email={user.email}
                parents={user.parents}
                onViewForm={this.onViewForm}
              />
            </Col>

            <Col md={2}></Col>
          <Col md={5} className='center-div bc-green'>
              <Messages unreadMessages={unreadMessages} />

            </Col>
          </Row>
          <Row className='profile-row'>
            
              <Events
                currentUserLoggedId={user._id}
                events={events}
                onAcceptEvent={this.handleAcceptEvent}
                onDismissEvent={this.handleDismissEvent}
              />
       
            </Row>

        <Modal
          size="lg"
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Body>
            <UserForm
              id={user._id}
              name={user.name}
              lastname={user.lastname}
              email={user.email}
              username={user.username}
              parent={user.parent}
              onUserChanged={(user) => {
                this.setState({ user: user })
                this.props.setTheUser(user)
                this.setState({ showModal: false })
              }}
              fromDetail={true}
            />
          </Modal.Body>
        </Modal>


     
      </Container>
    );
  }
}

export default Profile;
