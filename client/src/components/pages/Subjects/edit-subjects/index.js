// import React, { Component } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// class SubjectForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             role: props.role,
//             subject: {
//                 id: props.id,
//                 title: props.title,
//                 description: props.description,
//                 teacher: props.teacher,
//             },
//             validated: false,
//         };
//     }

//     handleInputChange = e => {

//         const { name, value } = e.target;
//         this.setState({
//             user: {
//                 ...this.state.user,
//                 [name]: value
//             }
//         });
//     };

//     handleSubmit = e => {
//         e.preventDefault();
//         const form = e.currentTarget;
//         const { user } = this.state;
//         if (form.checkValidity() === false) {
//             e.stopPropagation();
//         } else {
//             this.props.onUserChanged(user);
//         }
//         this.setState({ validated: true });
//     };

//     render() {
//         const { title, teacher } = this.state;
//         return (
//             <>
//                 <h3>{user.id ? "Editar Asignatura" : "Nueva Asignatura"}</h3>
//                 <hr></hr>
//                 {role === "DIRECTOR" && <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
//                     <Form.Group>
//                         <Form.Label>Asignatura</Form.Label>
//                         <Form.Control
//                             required
//                             onChange={event => this.handleInputChange(event)}
//                             value={title}
//                             name="name"
//                             type="text"
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             Nombre requerido.
//                     </Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group>
//                         <Form.Label>Profesor</Form.Label>
//                         <Form.Control
//                             required
//                             onChange={event => this.handleInputChange(event)}
//                             value={teacher.name}
//                             name="lastname"
//                             type="text"
//                         />
//                         <Form.Control.Feedback type="invalid">
//                             Profesor requerido.
//                         </Form.Control.Feedback>
//                     </Form.Group>

//                     <Button variant="dark" type="submit">
//                         Submit
//           </Button>
//                 </Form>
//             }
//             </>
//         );
//     }
// }

// UserForm.defaultProps = {
//     profileImg:
//         "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595247178/School%20Hack/images_rtgo7j.jpg",
// };

// export default SubjectForm;