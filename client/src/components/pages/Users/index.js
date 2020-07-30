import React, { Component } from "react";
import SchoolHackApi from "../../../service/SchoolHackApi";


import CustomTable from "../../common/Table";
import UserForm from "../../common/Forms/User-form";
import Spinner from "../../ui/Spinner";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { Link } from "react-router-dom";



import "./users.css";


const emptyForm = {
  id: "",
  lastname: "",
  email: "",
  name: "",
  username: "",
  password: "",
  type: "STUDENT",
  parent: "",
  profileImg: "",
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      users: undefined,
      showModal: false,
      selected: emptyForm,
    };

    this.schoolHackApi = new SchoolHackApi();
    this.togglePopover = this.togglePopover.bind(this);
  }

  togglePopover() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }


  componentDidMount = () => {
    this.updatedUsersList();
  };

  updatedUsersList = () => {
    this.schoolHackApi
      .getAllStudent()
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((err) => console.log(err));
  };

  handleUserDelete = (id) => {
    this.schoolHackApi.deleteUser(id).then(() => {
      this.setState({
        users: this.state.users.filter((elm) => elm._id !== id),
      });
    });
  };

  handleUsersSubmit = (newUserInfo) => {
    const action = newUserInfo.id
      ? this.schoolHackApi.updateUser(newUserInfo)
      : this.schoolHackApi.createUser(newUserInfo);

    action
      .then(() => {
        this.updatedUsersList();
        this.setState({ showModal: false });
      })
      .catch((err) => console.log("error en createUser", err));
  };

  render() {
    const { users, showModal, selected } = this.state;
    

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">{selected.name} {selected.lastname}</Popover.Title>
    <Popover.Content>
      <strong>Username:</strong> {selected.username}<br></br> <strong>email: </strong>{selected.email}<br></br> 
      <strong>Madre/Padre:</strong> {selected.parent}
    </Popover.Content>
  </Popover>
);
    return (
      <>
        <Row>
          <Col sm={12} className='header-page'>

            <h1>Estudiantes:</h1>

            <Button variant="outline-success"
              onClick={() =>
                this.setState({ selected: emptyForm, showModal: true })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>



        <Row>
          <Col md={9}>
            {!users ? (
              <h3>
                <Spinner />
              </h3>
            ) : (
                <CustomTable
                  data={users}
                  header={
                    <>
                      <th>Nombre</th>
                      <th>Foto</th>
                      <th>Email</th>
                      <th></th>
                    </>
                  }
                  rowMap={(elm) => (
                    <tr key={elm._id}>
                      <td>
                        {elm.lastname}, {elm.name}
                      </td>
                      <td>
                        <img src={
                          elm.profileImg === undefined ? "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595247178/School%20Hack/images_rtgo7j.jpg" : elm.profileImg
                        } alt={elm.username} />
                      </td>
                      <td>{elm.email}</td>

                      <td>
                        <Col className="link-td">

                          <Link as='button' className="btn-link-table" onClick={() => {
                            this.setState({
                              selected: {
                                id: elm._id,
                                lastname: elm.lastname,
                                email: elm.email,
                                name: elm.name,
                                username: elm.username,
                                type: "STUDENT",
                                parent: elm.parent,
                              },
                              showModal: true,
                            });
                          }}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>

                          <Link as='button' className="btn-link-table" onClick={() => this.handleUserDelete(elm._id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Link>

                          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                            <Link as='button' className="btn-link-table" id="popover-basic" type="button"
                              onClick={() =>
                                this.setState({
                                  selected: {
                                    id: elm._id,
                                    profileImg: elm.profileImg,
                                    lastname: elm.lastname,
                                    email: elm.email,
                                    name: elm.name,
                                    username: elm.username,
                                    parent: elm.parent,
                                  },
                                })
                              }>
                              <FontAwesomeIcon icon={faInfo} />
                            </Link>
                          </OverlayTrigger>
                        </Col>

                      </td>
                    </tr>
                  )}
                />
              )}
          </Col>
          <Col md={2} className="studentCard">

          </Col>
          <Modal
            size="lg"
            show={showModal}
            onHide={() => this.setState({ showModal: false })}
          >
            <Modal.Body>
              <UserForm
                role="DIRECTOR"
                id={selected.id}
                lastname={selected.lastname}
                email={selected.email}
                name={selected.name}
                username={selected.username}
                password={selected.password}
                type={selected.type}
                parent={selected.parent}
                onUserChanged={this.handleUsersSubmit}
              />
            </Modal.Body>
          </Modal>
        </Row>
      </>
    );
  }
}

export default Users;
