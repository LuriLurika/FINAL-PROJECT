import React, { Component } from "react";

import "./index.css";

import CourseForm from '../../common/Forms/Course-Subject-form'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import SchoolHackApi from "../../../service/SchoolHackApi";
import Spinner from "../../ui/Spinner";
import CustomTable from "../../common/Table";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";


const emptyForm = {
  id: "",
  title: "",
  subjects: [],
  users: []
};



class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: undefined,
      showModal: false,
      selected: emptyForm,
      allSubjects: [],
      // allStudents: [],
    };

    this.schoolHackApi = new SchoolHackApi();
  }

  componentDidMount = () => {
    this.updateCourseList();
    this.updatedSubjectsList();
    // this.updatedUsersList();
  };

  updateCourseList = () => {
    this.schoolHackApi
      .getAllCourses()
      .then((response) => {
        const ord = response.data.sort();
        this.setState({ courses: ord });
      })
      .catch((err) => console.log(err));
  };

  updatedSubjectsList = () => {
    this.schoolHackApi
      .getAllSubjects()
      .then((response) => this.setState({ allSubjects: response.data }));
  };
  // updatedUsersList = () => {
    
  //   this.schoolHackApi
  //     .getAllUsers()
  //     .then((response) => this.setState({ allUsers: response.data }));
  // };

  handleUpdatedCourse = (courseInfo) => {
    const action = courseInfo.id
      ? this.schoolHackApi.updatedCourse(courseInfo)
      : null;

    action
      .then(() => {
        this.updateCourseList();
        this.setState({
          showModal: false,
        });
      })
      .catch((err) => console.log("updating course", err));
  };

  handleDeleteSubjects = (subjectId, course) => {
    const updatedSubjects = course.subjects.filter(
      (elm) => elm._id !== subjectId
    );

    course.subjects = updatedSubjects;

    this.schoolHackApi
      .updatedCourse(course)
      .then(() => this.updateCourseList())
      .catch((err) => console.log(err));
  };

  handleDeleteUsers = (userId, course) => {
    const updatedUsers = course.users.filter((elm) => elm._id !== userId);

    course.users = updatedUsers;

    this.schoolHackApi
      .updatedCourse(course)
      .then(() => this.updateCourseList())
      .catch((err) => console.log(err));
  };

  handleAddSubjects = (subject, course) => {
    course.subjects = [...course.subjects, subject];

    this.schoolHackApi
      .updatedCourse(course)
      .then(() => {
        this.updateCourseList();
        this.setState({ showModal: false });
      })
      .catch((err) => console.log(err));
  };

  handleAddUsers = (user, course) => {
    course.users = [...course.users, user];

    this.schoolHackApi
      .updatedCourse(course)
      .then(() => {
        this.updateCourseList();
        this.setState({ showModal: false });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { courses, selected, showModal, allSubjects, allStudents } = this.state;

    return (
      <>
        <h1>Cursos</h1>

        {!this.state.courses ? (
          <p>
            <Spinner />
          </p>
        ) : (
          <Row>
            <Col md={8}>
              <CustomTable
                data={courses}
                header={
                  <>
                    <th>Nombre</th>
                    <th>Asignaturas</th>
                    {/* <th>Alumnos</th> */}
                  </>
                }
                rowMap={(elm) => (
                  <tr>
                    <td>{elm.title}</td>

                    <td>
                      <ul>
                        {elm.subjects.map((Element) => (
                          <li>
                            {Element.title}
                            <Button
                              onClick={() =>
                                this.handleDeleteSubjects(Element._id, elm)
                              }
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={() =>
                          this.setState({
                            selected: elm,
                            showModal: true,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </td>

                    {/* <td>
                      <ul>
                        {elm.users.map((Elem) => (
                          <li>
                            {Elem.lastname}
                            <Button
                              onClick={() =>
                                this.handleDeleteUsers(Elem._id, elm)
                              }
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={() =>
                          this.setState({
                            selected: elm,
                            showModal: true,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </td> */}
                  </tr>
                )}
              />
            </Col>
            <Modal
              size="lg"
              show={showModal}
              onHide={() => this.setState({ showModal: false })}
            >
              <Modal.Body>
                <CourseForm
                  subjects={allSubjects.filter(
                    (subject) =>
                      !selected.subjects.some((elm) => elm._id === subject._id)
                  )}
                  onSubjectChanged={(subjects) =>
                    this.handleAddSubjects(subjects, selected)
                  }
                />
                {/* <CourseForm
                  subjects={allStudents.filter(
                    (user) =>
                      !selected.users.some((elm) => elm._id === user._id)
                  )}
                  onUserChanged={(users) =>
                    this.handleAddUsers(users, selected)
                  }
                /> */}
              </Modal.Body>
            </Modal>
          </Row>
        )}
      </>
    );
  }
}

export default Courses;
