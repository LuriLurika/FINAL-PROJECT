import React, { Component } from "react";

import "./index.css";

import CourseForm from '../../common/Forms/Course-form'

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
};

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: undefined,
      showModal: false,
      selected: emptyForm,
      allSubjects: []

    };

    this.schoolHackApi = new SchoolHackApi();
  }

  componentDidMount = () => {
    this.updateCourseList()
    this.updatedSubjectsList()
  }
  
  updateCourseList = () => {
    this.schoolHackApi
      .getAllCourses()
      .then((response) => {
        const ord = response.data.sort()
        this.setState({courses: ord});
      })
      .catch((err) => console.log(err));
  }
  
  updatedSubjectsList = () => {
    this.schoolHackApi
    .getAllSubjects()
    .then (response => this.setState ( {allSubjects: response.data}))
}


  handleUpdatedCourse = (courseInfo) => {

  const action = courseInfo.id? this.schoolHackApi.updatedCourse(courseInfo): null

  action
    .then(() => {
      this.updateCourseList()
      this.setState({
        showModal: false
      });
    })
    .catch((err) => console.log("updating course", err));
  };


  handleDeleteSubjects = (subjectId, course) => {

    const updatedSubjects = course.subjects.filter(elm => elm._id !== subjectId) 
    
    course.subjects = updatedSubjects

    this.schoolHackApi.updatedCourse(course)
      .then(() => this.updateCourseList())
      .catch((err) => console.log(err));

  }

  handleAddSubjects = (subject, course) => {

    course.subjects = [...course.subjects, subject]

    this.schoolHackApi
      .updatedCourse(course)
      .then(() => {
        this.updateCourseList()
        this.setState({ showModal: false })
      })
      .catch((err) => console.log(err));
  }


  render() {

    const { courses, selected, showModal, allSubjects } = this.state;

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
                  </>
                }
                rowMap={(elm) => (
                  <tr>
                    <td>{elm.title}</td>

                    <td>
                      <ul>
                        {elm.subjects.map((Element) => (
                          <li>
                            {Element.title}{" "}
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
                  subjects={allSubjects.filter(subject => !selected.subjects.some(elm => elm._id === subject._id))}
                  onSubjectChanged={(subjects) => this.handleAddSubjects(subjects, selected)}
                />
              </Modal.Body>
            </Modal>
          </Row>
        )}
      </>
    );
  }
}

export default Courses;
