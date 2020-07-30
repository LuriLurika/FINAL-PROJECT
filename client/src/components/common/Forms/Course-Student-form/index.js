import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CourseUserForm extends Component {
  constructor(props) {
        console.log(props);

    super(props);
    this.state = {
      selectedUsers:undefined,
      validated: false,
    };
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({
      selectedUsers: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { selectedUsers } = this.state;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.onUserChanged(selectedUsers);
    }
    this.setState({ validated: true });
  };

  render() {
    const { selectedUsers, validated } = this.state;
    return (
      <>
        
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
         
       <Form.Group>
            <Form.Label>Alumnos</Form.Label>
            <Form.Control
              as="select"
              required
              onChange={(event) => this.handleInputChange(event)}
              value={selectedUsers}
              type="text"
            >
              {this.props.users.map((elm) => (
                <option key={elm._id} value={elm._id}>
                  {elm.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        
          <Button variant="dark" type="submit">
            Agregar
          </Button>
        </Form>
      </>
    );
  }
}

export default CourseUserForm;
