import React, { Component } from "react";
import SchoolHackApi from "../../../service/SchoolHackApi";
import { Container, Col, Button, Row } from "react-bootstrap";

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
        <Row>
          <Col md="8">Asunto: {title}</Col>
          <Col md="2">
            <Button onClick={() => this.props.history.push("/messages")}>
              Atras
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            Enviado por: {sendedBy.name} {sendedBy.lastname}
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <p>Mensaje:</p>
            <p>{body}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MessageDetail;
