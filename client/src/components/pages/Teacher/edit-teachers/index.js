import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class TeacherForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            role: props.role,

            teachers: {
                id: props.id,
                name: props.name,
                lastname: props.lastname,
                email: props.email,
                username: props.username,
                password: props.password,
                profileImg: props.profileImg,
                type: "TEACHER",
            },
            validated: false,
        }
    }

    handleInputChange = e => {

        const { name, value } = e.target;
        this.setState({
            teachers: {
                ...this.state.teachers,
                [name]: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget
        const { teachers } = this.state
        if (form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            this.props.onTeacherChanged(teachers)
        }
        this.setState({ validated: true })
    }

    render() {
        const { teachers, validated, role } = this.state;
        return (
            <>
                <h3>{teachers.id ? "Editar Profesor" : "Nuevo Profesor"}</h3>
                <hr></hr>
                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control required onChange={event => this.handleInputChange(event)} value={teachers.name} name="name" type="text" />
                        <Form.Control.Feedback type="invalid"> Campo requerido </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control required onChange={event => this.handleInputChange(event)} value={teachers.lastname} name="lastname" type="text" />
                        <Form.Control.Feedback type="invalid"> Campo requerido </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control onChange={event => this.handleInputChange(event)} value={teachers.profileImg} name="profileImg" type="text" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control required onChange={event => this.handleInputChange(event)} value={teachers.email} name="email" type="email" />
                        <Form.Control.Feedback type="invalid"> Campo requerido </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required onChange={event => this.handleInputChange(event)} value={teachers.username} name="username" type="text" />
                        <Form.Control.Feedback type="invalid">Campo requerido </Form.Control.Feedback>
                    </Form.Group>

                    {!teachers.id && (
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                        <Form.Control required onChange={event => this.handleInputChange(event)} value={teachers.password} name="password" type="password" />
                            <Form.Control.Feedback type="invalid">Campo requerido </Form.Control.Feedback>
                        </Form.Group>
                    )}

                    <Button variant="dark" type="submit"> Enviar </Button>
                </Form>
            </>
        );
    }
}

TeacherForm.defaultProps = { profileImg: "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595247178/School%20Hack/images_rtgo7j.jpg" }

export default TeacherForm;
