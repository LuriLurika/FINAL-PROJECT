import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: props.role,
      user: {
        id: props.id,
        name: props.name,
        lastname: props.lastname,
        email: props.email,
        username: props.username,
        password: props.password,
        profileImg: props.profileImg,
        type: props.type,
        parent: props.parent,
      },
      validated: false,
    };
  }

  handleInputChange = e => {

      const { name, value } = e.target;
      this.setState({
          user: {
              ...this.state.user,
              [name]: value
          }
      });
  };
    
  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const { user } = this.state;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.onUserChanged(user);
    }
    this.setState({ validated: true });
  };

  render() {
    const { user, validated, role } = this.state;
    return (
      <>
        <h3>{user.id ? "Editar Usuario" : "Nuevo usuario"}</h3>
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              onChange={event => this.handleInputChange(event)}
              value={user.name}
              name="name"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Nombre requerido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              required
              onChange={event => this.handleInputChange(event)}
              value={user.lastname}
              name="lastname"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Apellidos requerido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
              onChange={event => this.handleInputChange(event)}
              value={user.profileImg}
              name="profileImg"
              type="text"
            />
          </Form.Group>

          {role === "DIRECTOR" && (
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                required
                onChange={event => this.handleInputChange(event)}
                value={user.type}
                name="type"
                type="text"
              />
              <Form.Control.Feedback type="invalid">
                tipo requerido.
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Padre/s</Form.Label>
            <Form.Control
              required
              onChange={event => this.handleInputChange(event)}
              value={user.parent}
              name="parent"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              padre requerido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              required
              onChange={event => this.handleInputChange(event)}
              value={user.email}
              name="email"
              type="email"
            />
            <Form.Control.Feedback type="invalid">
              email requerido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              onChange={event => this.handleInputChange(event)}
              value={user.username}
              name="username"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Username requerido.
            </Form.Control.Feedback>
          </Form.Group>

          {!user.id && (
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                onChange={event => this.handleInputChange(event)}
                value={user.password}
                name="password"
                type="password"
              />
              <Form.Control.Feedback type="invalid">
                Password requerido.
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

UserForm.defaultProps = {
  profileImg:
    "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595247178/School%20Hack/images_rtgo7j.jpg",
};

export default UserForm;
