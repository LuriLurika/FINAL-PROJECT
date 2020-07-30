import React, { Component } from "react";
import CustomTable from "../../common/Table";
import TeacherForm from "./edit-teachers/";

import SchoolHackApi from "../../../service/SchoolHackApi";

import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faInfo,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Modal } from "react-bootstrap";
import Spinner from "./../../ui/Spinner";

const emptyTeacher = {
  id: "",
  lastname: "",
  email: "",
  name: "",
  username: "",
  password: "",
  type: "TEACHER",
  profileImg: "",
};

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: undefined,
      showModal: false,
      selected: emptyTeacher,
      courses: undefined,
      students: [],
    };
    this.schoolHackApi = new SchoolHackApi();
  }

  componentDidMount = () => {
    this.updatedTeachersList();

  };

  updatedTeachersList = () => {
    this.schoolHackApi
      .getAllTeachers()
      .then((response) => {
        this.setState({ teachers: response.data });
      })
      .catch((err) => console.log(err));
  };

  handleDelete = (id) => {
    this.schoolHackApi.deleteTeacher(id).then(() => {
      this.setState({
        teachers: this.state.teachers.filter((elm) => elm._id !== id),
      });
    });
  };

  handleTeachersSubmit = (newTeacherInfo) => {
    const action = newTeacherInfo.id
      ? this.schoolHackApi.updateTeacher(newTeacherInfo)
      : this.schoolHackApi.createTeacher(newTeacherInfo);
    action
      .then(() => {
        this.updatedTeachersList();
        this.setState({ showModal: false });
      })
      .catch((err) => console.log("error en modal Teacher", err));
  };

  getCourses = (id) => {
    this.schoolHackApi.getCoursesTeacher(id)
      .then((response) => {
        this.setState({ courses: response.data })
        console.log(response.data)
      })
      .catch((err) => console.log("error en get c Teacher", err));
  }

  getUsers = (id) => {
    this.schoolHackApi.getUsersTeacher(id)
      .then((response) => {
        this.setState({ students: response.data })
      })
      .catch((err) => console.log("error en get u Teacher", err));
  }

  handleInfo = (teacher) => {
    this.setState ({selected: teacher})
  
    this.getCourses(teacher._id);
    this.getUsers(teacher._id);
  };


  render() {
    const { teachers, selected, courses, students } = this.state;
    let acum = []

    return (
      <>
        <Row>
          <Col sm={12} className='header-page'>

            <h1>Profesores:</h1>

            <Button variant="outline-success"
              onClick={() =>
                this.setState({ selected: emptyTeacher, showModal: true })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>


        <Row>
          <Col md={8}>
            {!teachers ? (
              <Spinner />
            ) : (
              <CustomTable
                data={teachers}
                header={
                  <>
                    <th>Nombre</th>
                    <th>Foto</th>
                    <th>Email</th>
                    <th>Acciones</th>
                  </>
                }
                rowMap={(elm) => (
                  <tr key={elm._id}>
                    <td>
                      {elm.name} {elm.lastname}
                    </td>
                    <td>
                      <img src={elm.profileImg} alt={elm.username} />
                    </td>
                    <td>{elm.email}</td>
                    <td>

                      <Col className="link-td">

                        <Link as='button' className="btn-link-table" onClick={() =>
                          this.setState({
                            selected: {
                              id: elm._id,
                              name: elm.name,
                              lastname: elm.lastname,
                              email: elm.email,
                              username: elm.username,
                              password: elm.password,
                              type: "TEACHER",
                              profileImg: elm.password,
                            },
                            showModal: true,
                          })
                        }>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>

                        <Link as='button' className="btn-link-table" onClick={() => this.handleDelete(elm._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Link>

                        <Link as='button' className="btn-link-table" onClick={() => this.handleInfo(elm)}>
                          <FontAwesomeIcon icon={faInfo} />
                        </Link>
                      </Col>
                    </td>
                  </tr>
                )}
              />
            )}
          </Col>

          <Col
            md={4}
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
          >
            {!courses ? (
              null
            ) : (
              <>
                <p>
                  Actualmente el profesor {this.state.selected.name} da clase a
                  {students.length} alumnos en {courses.length} cursos de las
                  siguientes asignaturas:
                </p>
                
                {
                  (courses.map(
                    (element) =>
                      (acum = [
                        ...acum,
                        ...element.subjects.filter(
                          (elm) => elm.teacher === this.state.selected._id
                        ).map(elm => ({...elm, course: element})),
                      ])
                  ),
                  acum
                    .filter((v, i) => acum.indexOf(v) === i)
                      .map((subject) => {
                        return (
                          <p key={subject._id}>
                            {subject.title} {subject.course.title}
                          </p>
                        )
                      }))
                }
              </>
            )}
          </Col>

          <Modal
            size="lg"
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
          >
            <Modal.Body>
              <TeacherForm
                role="DIRECTOR"
                id={selected.id}
                name={selected.name}
                lastname={selected.lastname}
                email={selected.email}
                username={selected.username}
                password={selected.password}
                type="TEACHER"
                profileImg={selected.profileImg}
                onTeacherChanged={this.handleTeachersSubmit}
              />
            </Modal.Body>
          </Modal>
        </Row>
      </>
    );
  }
}

export default Teacher;
