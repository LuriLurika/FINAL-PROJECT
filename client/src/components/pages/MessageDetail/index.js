import React, { Component } from "react";
import SchoolHackApi from "../../../service/SchoolHackApi";
import { Container, Col, Button, Row } from "react-bootstrap";

import './index.css'

class MessageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageId: this.props.match.params.id,
      message: {
        name: "",
        body: "",
        sendedBy: {
          name: "",
          lastname: "",
        },
        title: "",
      },
    };
    console.log(props);
    this.schoolHackApi = new SchoolHackApi();
  }
  componentDidMount = () => {
    Promise.all([
      this.schoolHackApi.getMessage(this.state.messageId),
      this.schoolHackApi.readMessage(this.state.messageId),
    ])
      .then((response) => this.setState({ message: response[0].data }))
      .catch((err) => console.log(err));
  };
  render() {
    const { title, receivedBy, sendedBy, body } = this.state.message;
    return (
      <Container>
        <Row className='header-page'>
          <Col md={12} className='btn-right'>
            <Button variant="outline-success" onClick={() => this.props.history.push("/messages")}>
              Atras
            </Button>
          </Col>
        </Row>
          <Row className='header-page'>
          <Col md={8} className="title-mail"><span className="text-muted">Asunto: </span>  {title}</Col>
        </Row>
        <Row>
          <Col md={8} className="send-by-mail">
            <span className="text-muted">Enviado por: </span>  {sendedBy.name} {sendedBy.lastname}
          </Col>
        </Row>
        <Row>
          <Col className="body-mail" md={8}>
            <span className="text-muted">Mensaje:</span>
          </Col>
        </Row>
        <Row>
          <Col md={8}> <p className="body-mail-text">{body}</p></Col>
        </Row>
      </Container>
    );
  }
}

export default MessageDetail;
