import React, { Component } from "react";
import CustomTable from "../../common/Table";
import TeacherForm from "./edit-teachers/";

import SchoolHackApi from "../../../service/SchoolHackApi";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
};

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: undefined,
      showModal: false,
      selected: emptyTeacher,
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

  handleInfo = (id) => {
    console.log("id", id);
    this.schoolHackApi.getCoursesTeacher(id).then((data) => console.log(data));
  };

  render() {
    const { teachers, selected } = this.state;
    return (
      <>
        <h1>Profesores</h1>
        <Button
          onClick={() =>
            this.setState({ selected: emptyTeacher, showModal: true })
          }
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Row>
          <Col md={6}>
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
                        {elm.lastname}, {elm.name}
                      </td>
                      <td>
                        <img src={elm.profileImg} alt={elm.username} />
                      </td>
                      <td>{elm.email}</td>
                      <td>
                        <Button
                          onClick={() =>
                            this.setState({
                              selected: {
                                id: elm._id,
                                name: elm.name,
                                lastname: elm.lastname,
                                email: elm.email,
                                username: elm.username,
                                password: elm.password,
                                type: "TEACHER",
                              },
                              showModal: true,
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button onClick={() => this.handleDelete(elm._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                        <Button onClick={() => this.handleInfo(elm._id)}>
                          <FontAwesomeIcon icon={faInfo} />
                        </Button>
                      </td>
                    </tr>
                  )}
                />
              )}
          </Col>

          <Col md={6}
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
          >
            <p>Datos de profe (name) y de curso, alummo</p>
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
