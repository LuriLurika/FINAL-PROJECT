import React, { Component } from "react";
import CustomTable from "../../common/Table";
import SubjectForm from "./edit-subjects";

import SchoolHackApi from "../../../service/SchoolHackApi";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from "../../ui/Spinner";
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";

import './index.css'

const emptySubject = {
  id: "",
  title: "",
  description: "",
  teacher: {
    _id: "",
  },
};

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: undefined,
      description: "",
      showModal: false,
      teachers: [],
      selected: emptySubject,
    };
    this.schoolHackApi = new SchoolHackApi();
  }

  componentDidMount = () => {
    this.updatedSubjectList();
    this.getAllTeachers();
  };

  updatedSubjectList = () => {
    this.schoolHackApi
      .getAllSubjects()
      .then((response) => 
        this.setState({ subjects: response.data }))
      .catch((err) => console.log(err));
  };

  getAllTeachers = () => {
    this.schoolHackApi.getAllTeachers().then((response) => {
      this.setState({ teachers: response.data });
    });
  };

  handleDelete = (id) => {
    this.schoolHackApi.deleteSubject(id).then(() => {
      this.setState({
        subjects: this.state.subjects.filter((elm) => elm._id !== id),
      })
      this.props.handleToast(true, "¡Asignatura eliminada!")
    });
  };

  handleSubjectSubmit = (updateSubjectInfo) => {
    const action = updateSubjectInfo.id
      ? this.schoolHackApi.updateSubject(updateSubjectInfo)
      : this.schoolHackApi.createSubject(updateSubjectInfo);
    action
      .then(() => {
        this.updatedSubjectList();
        this.setState({ showModal: false })
        this.props.handleToast(true, "¡Cambios guardados!")
      })
      .catch((err) => {
        console.log("error en create Subject", err)
        this.props.handleToast(true, "¡Algo salió mal!")
      });
  };

  render() {
    const { subjects, description, showModal, selected, teachers } = this.state;
    return (
      <>

        <Row>
          <Col sm={12} className='header-page'>

            <h1>Asignaturas:</h1>

            <Button variant="outline-success"
              onClick={() =>
                this.setState({ selected: emptySubject, showModal: true })
              }>
              <FontAwesomeIcon icon={faBookMedical} />
            </Button>
          </Col>
        </Row>


        <Row>
          <Col md={9}>
            {!subjects ? (
              <Spinner />
            ) : (
                <CustomTable
                  data={subjects}
                  header={
                    <>
                      <th>Asignatura</th>
                      <th>Profesor</th>
                      <th>Acciones</th>
                    </>
                  }
                  rowMap={(elm) => (
                    <tr key={elm._id}>
                      <td>{elm.title}</td>
                      <td>
                        <img
                          src={elm.teacher.profileImg}
                          alt={elm.teacher.name}
                        />
                        {elm.teacher.name} {elm.teacher.lastname}
                      </td>
                      <td>
                        <Col className="link-td">

                          <Link as='button' className="btn-link-table" onClick={() =>
                            this.setState({ description: elm.description })}>
                            <FontAwesomeIcon icon={faInfo} />
                          </Link>

                          <Link as='button' className="btn-link-table" onClick={() =>
                            this.setState({
                              selected: {
                                id: elm._id,
                                title: elm.title,
                                description: elm.description,
                                teacher: elm.teacher,
                              },
                              showModal: true,
                            })}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>

                          <Link as='button' className="btn-link-table" onClick={() => this.handleDelete(elm._id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Link>
                        </Col>
                      </td>
                    </tr>
                  )}
                />
              )}
          </Col>
          <Col md={3}>
            <p>{description}</p>
          </Col>
          <Modal
            size="lg"
            show={showModal}
            onHide={() => this.setState({ showModal: false })}
          >
            <Modal.Body>
              <SubjectForm
                role="DIRECTOR"
                id={selected.id}
                title={selected.title}
                description={selected.description}
                teacher={selected.teacher}
                teachers={teachers}
                onSubjectChanged={this.handleSubjectSubmit}
              />
            </Modal.Body>
          </Modal>
        </Row>
      </>
    );
  }
}

export default Subjects;
