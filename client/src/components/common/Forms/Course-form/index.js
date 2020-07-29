import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CourseForm extends Component {
  constructor(props) {
        console.log(props);

    super(props);
    this.state = {
      course: {
        id: props.id,
        title: props.title,
        subjects: props.body,
        users: props.users,
       },
      validated: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      course: { ...this.state.course, [name]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { course } = this.state;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.onCourseChanged(course);
    }
    this.setState({ validated: true });
  };

  render() {
    const { course, validated } = this.state;
    return (
      <>
        
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Curso</Form.Label>
                    <Form.Control
                        required onChange={(event) => this.handleInputChange(event)} value={course.title} name="title" type="text"/>
          </Form.Group>

       <Form.Group>
            <Form.Label>Materias</Form.Label>
            <Form.Control
              as="select"
              required
              onChange={(event) => this.handleInputChange(event)}
              value={course.subjects}
              name="subjects"
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
            Modificar
          </Button>
        </Form>
      </>
    );
  }
}

export default CourseForm;
