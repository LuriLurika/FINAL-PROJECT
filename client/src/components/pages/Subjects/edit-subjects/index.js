import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


class SubjectForm extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      role: props.role,
      subject: {
        id: props.id,
        title: props.title,
        description: props.description,
        teacher: props.teacher,
      },
      validated: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      subject: {
        ...this.state.subject,
        [name]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { subject } = this.state;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.onSubjectChanged(subject);
    }
    this.setState({ validated: true });
  };

  render() {
    const { subject, role, validated } = this.state;
    return (
      <>
        <h3>{subject.id ? "Editar Asignatura" : "Nueva Asignatura"}</h3>
        <hr></hr>
        {role === "DIRECTOR" && (
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Group className="normalForm">
              <Form.Label>Asignatura</Form.Label>
              <Form.Control
                required
                onChange={(event) => this.handleInputChange(event)}
                value={subject.title}
                name="title"
                type="text"
              />
              <Form.Control.Feedback type="invalid">
                Nombre requerido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                required
                onChange={(event) => this.handleInputChange(event)}
                value={subject.description}
                name="description"
                as="textarea"
                rows="6"
              />
              <Form.Control.Feedback type="invalid">
                Profesor requerido.
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Form>
        )}
      </>
    );
  }
}

SubjectForm.defaultProps = {
    profileImg:
        "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595247178/School%20Hack/images_rtgo7j.jpg",
};

export default SubjectForm;