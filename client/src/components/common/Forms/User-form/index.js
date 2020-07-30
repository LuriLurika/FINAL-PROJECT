import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FileService from '../../../../service/FileService'

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
        // profileImg: props.profileImg,

      },
      validated: false,
    }
    this.fileService = new FileService();

  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { user } = this.state;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.onUserChanged(user);
    }
    this.setState({ validated: true });
  }

  handleFileUpload = e => {
    const uploadData = new FormData()
    uploadData.append("profileImg", e.target.files[0])
    this.fileService.handleUpload(uploadData)
      .then(response => {
        console.log('Subida de archivo finalizada! La URL de Cloudinary es: ', response.data.secure_url)
        this.setState({
          user: {
            ...this.state.user,
            profileImg: response.data.secure_url
          }
        })
        console.log('nueva imagen subida', this.state.user)

      })
      .catch(err => console.log(err))
  }

  render() {
    const { user, validated } = this.state;
    const {fromDetail} = this.props
    return (
      <>
        <h3>{user.id ? "Editar Información" : "Nuevo Alumno"}</h3>
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              onChange={(event) => this.handleInputChange(event)}
              value={user.name}
              name="name"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Campo requerido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              required
              onChange={(event) => this.handleInputChange(event)}
              value={user.lastname}
              name="lastname"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Campo requerido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              as="input"
              onChange={this.handleFileUpload}
              name="profileImg"
              type="file"
            />
          </Form.Group>

          {!fromDetail && (
            <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              onChange={(event) => this.handleInputChange(event)}
              value={user.type}
              name="type"
              type="text"
            />
            </Form.Group>)}
          
          {/* {
            user !== null && user.type === "STUDENT" ?
          (<> */}
            <Form.Group>
              <Form.Label>Madre / Padre</Form.Label>
              <Form.Control
                required
                onChange={(event) => this.handleInputChange(event)}
                value={user.parent}
                name="parent"
                type="text"
              />
              <Form.Control.Feedback type="invalid">
                Campo requerido
            </Form.Control.Feedback>
            </Form.Group>
          {/* </>
          ) : null}       */}
          
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              required
              onChange={(event) => this.handleInputChange(event)}
              value={user.email}
              name="email"
              type="email"
            />
            <Form.Control.Feedback type="invalid">
              Campo requerido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              onChange={(event) => this.handleInputChange(event)}
              value={user.username}
              name="username"
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Campo requerido
            </Form.Control.Feedback>
          </Form.Group>
          {!user.id &&
            !fromDetail &&(
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  onChange={(event) => this.handleInputChange(event)}
                  value={user.password}
                  name="password"
                  type="password"
                />
                <Form.Control.Feedback type="invalid">
                  Campo requerido
                </Form.Control.Feedback>
              </Form.Group>
            )}
          <Button variant="dark" type="submit">
            Enviar
          </Button>
        </Form>
      </>
    );
  }
}

UserForm.defaultProps = { fromDetail: false };
export default UserForm;
