import React, { Component } from "react";
import SchoolHackApi from "../../../service/SchoolHackApi";

import ListMail from "./Message-card/list-mail";

import MessageForm from "../../common/Forms/Message-form";
import Spinner from "../../ui/Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import './Message-card/index.css'


const emptyMessage = {
  _id: "",
  title: "",
  body: "",
  receivedBy: "",
  parentMessage: null,
};
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesSend: undefined,
      messagesReceived: undefined,
      showModal: false,
      users: [],
      selected: emptyMessage,
    };

    this.schoolHackApi = new SchoolHackApi();
  }

  componentDidMount = () => {
    this.getAllUser();
    this.updatedMessagesList();
  };

  getAllUser = () => {
    this.schoolHackApi
      .getAllUsers()
      .then((users) => {
        this.setState({ users: users.data });
      })
      .catch((err) => console.log(err));
  };
  updatedMessagesList = () => {
    if (this.props.loggedInUser) {
      Promise.all([
        this.schoolHackApi.getAllSendedMessages(this.props.loggedInUser._id),
        this.schoolHackApi.getAllReceivedMessages(this.props.loggedInUser._id),
      ])
        .then((response) => {
          console.log(response);
          this.setState({
            messagesSend: response[0].data,
            messagesReceived: response[1].data,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  deleteMessage = (id) => {
    this.schoolHackApi
      .deleteMessage(id)
      .then(() => {
        this.updatedMessagesList()
        this.props.handleToast(true, "¡Mensaje eliminado!")
      })
      .catch((err) => console.log(err));
    
  };

  handleModal = (status) => this.setState({ showModal: status });

  handleMessagesSubmit = (newMessageInfo) => {
    this.schoolHackApi
      .createMessages(newMessageInfo)
      .then(() => {
        this.updatedMessagesList();
        this.handleModal(false);
        this.props.handleToast(true, "¡Mensaje enviado!")
      })
      .catch((err) => console.log("error en createMessages", err));
  };

  handleReplyMessage = (id, sendedBy, title) => {
    this.setState({
      selected: {
        ...emptyMessage,
        parentMessage: id,
        receivedBy: sendedBy._id,
        title: `RE: ${title}`,
      },
      showModal: true,
      
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col sm={12} className='header-page'>

            <h1>Mensajes:</h1>

            <Button variant="outline-success"
              onClick={() =>
                this.setState({
                  selected: emptyMessage,
                  showModal: true,
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>


        <h4>Mensajes Recibidos</h4>
        {!this.state.messagesReceived ? (
          <h3>
            <Spinner />
          </h3>
        ) : (
            <Row>
              {this.state.messagesReceived.map((elm) => (
                <ListMail
                  key={elm._id}
                  onDeleteMessage={this.deleteMessage}
                  onReplyMessage={this.handleReplyMessage}
                  {...elm}
                />
              ))}
            </Row>
          )}
        <h4>Mensajes Enviados</h4>
        {!this.state.messagesSend ? (
          <h3>
            <Spinner />
          </h3>
        ) : (
            <Row>
              {this.state.messagesSend.map((elm) => (
                <ListMail
                  key={elm._id}
                  {...elm}
                  onDeleteMessage={this.deleteMessage}
                  onReplyMessage={this.handleReplyMessage}
                />
              ))}
            </Row>
          )}


        <Modal
          size="lg"
          show={this.state.showModal}
          onHide={() => this.handleModal(false)}
        >
          <Modal.Body>
            <MessageForm
              id={this.state.selected._id}
              title={this.state.selected.title}
              body={this.state.selected.body}
              receivedBy={this.state.selected.receivedBy}
              parentMessage={this.state.selected.parentMessage}
              onMessageChanged={this.handleMessagesSubmit}
              users={this.state.users}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Messages;
