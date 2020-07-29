import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CourseForm extends Component {
  constructor(props) {
        console.log(props);

    super(props);
    this.state = {
      selectedSubjects:undefined,
      validated: false,
    };
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({
      selectedSubjects: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { selectedSubjects } = this.state;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.onSubjectChanged(selectedSubjects);
    }
    this.setState({ validated: true });
  };

  render() {
    const { selectedSubjects, validated } = this.state;
    return (
      <>
        
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
         
       <Form.Group>
            <Form.Label>Materias</Form.Label>
            <Form.Control
              as="select"
              required
              onChange={(event) => this.handleInputChange(event)}
              value={selectedSubjects}
              type="text"
            >
              {this.props.subjects.map((elm) => (
                <option key={elm._id} value={elm._id}>
                  {elm.title}
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

export default CourseForm;
