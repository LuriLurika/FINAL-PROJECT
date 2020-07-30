import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class MessageForm extends Component {
  constructor(props) {
        console.log(props);

    super(props);
    this.state = {
      message: {
        id: props.id,
        title: props.title,
        body: props.body,
        receivedBy: props.receivedBy,
        users: props.users,
        parentMessage: props.parentMessage
      },
      validated: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      message: { ...this.state.message, [name]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = this.state;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.onMessageChanged(message);
    }
    this.setState({ validated: true });
  };

  render() {
    const { message, validated } = this.state;
    return (
      <>
        <h3>{this.props.receivedBy ? 'Responder mensaje' : 'Nuevo Mensaje'}</h3>
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              required
              onChange={(event) => this.handleInputChange(event)}
              value={message.title}
              name="title"
              type="text"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              required
              onChange={(event) => this.handleInputChange(event)}
              value={message.body}
              name="body"
              type="text"
              as="textarea"
              rows="3"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Para</Form.Label>
            <Form.Control
              as="select"
              required
              onChange={(event) => this.handleInputChange(event)}
              value={message.receivedBy}
              name="receivedBy"
              type="text"
            >
              {this.props.users.map((elm) => (
                <option key={elm._id} value={elm._id}>
                  {elm.name} {elm.lastname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="dark" type="submit">
            Enviar
          </Button>
        </Form>
      </>
    );
  }
}

export default MessageForm;
