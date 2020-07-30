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
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

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
         }
    

    this.schoolHackApi = new SchoolHackApi();
  }

  componentDidMount = () => {
    this.updatedUsersList()
    
  }
 

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
    


    return (
      <div className='overfl'>
        <h3>Estudiantes</h3>

        <Button
          onClick={() =>
            this.setState({ selected: emptyForm, showModal: true })
          }
          variant="dark"
          size="sm"
          style={{ marginBottom: "20px" }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Row>
          <Col md={8}>
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
                      <img src={elm.profileImg} alt={elm.username} />
                    </td>
                    <td>{elm.email}</td>

                    <td>
                      <Button
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
                        }
                      >
                        {/* Overlay */}
                        <FontAwesomeIcon icon={faInfo} />
                      </Button>

                      <Button
                        onClick={() => {
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
                            showModal: true
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button onClick={() => this.handleUserDelete(elm._id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </td>
                  </tr>
                )}
              />
            )}
          </Col>
          <Col md={4} className= 'studentCard'>
            <Image rounded src={selected.profileImg} alt={selected.username} />
            <Card.Body>
              <p>
                {selected.name} {selected.lastname}
              </p>
              <br></br>
{/* Popover */}
              <p>{selected.username}</p>
              <p>{selected.email}</p>
              <p>{selected.parent}</p>
            </Card.Body>
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
      </div>
    );
  }
}

export default Users;
