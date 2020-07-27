import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'


import CustomTable from '../../common/Table'
import UserForm from '../../common/Forms/User-form'
import Spinner from '../../ui/Spinner'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'



const emptyForm = {
  id: '',
  lastname: '',
  email: '',
  name: '',
  username: '',
  password: '',
  type: 'STUDENT',
  parent: '',
}

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
          users: undefined,
          showModal: false,
          selected: emptyForm,
          
        };

        this.schoolHackApi = new SchoolHackApi()

    }

    componentDidMount = () => this.updatedUsersList()
    

    updatedUsersList = () => {
        this.schoolHackApi
            .getAllUsers()
            .then(response => { this.setState({ users: response.data }) })
            .catch(err => console.log(err))
    }

          
    handleUserDelete = (id) => {
        this.schoolHackApi
            .deleteUser(id)
            .then(() => {
                this.setState({ users: this.state.users.filter((elm) => elm._id !== id) })
            })
    }

    
    handleUsersSubmit = newUserInfo => {
        
        const action = newUserInfo.id
            
          ? this.schoolHackApi.updateUser(newUserInfo)
          : this.schoolHackApi.createUser(newUserInfo)
       
        action
            .then(() => {
                this.updatedUsersList()
                this.setState({ showModal: false })
            })
            .catch(err => console.log('error en createUser', err))
    }

    render() {

        const { users, showModal, selected } = this.state;

        return (
          <>
            <Container as='main'>
              <h3>Estudiantes</h3>

              {/*this.props.loggedInUser && */}
              <Button
                onClick={() =>
                  this.setState({ selected: emptyForm, showModal: true })
                }
                variant='dark'
                size='sm'
                style={{ marginBottom: '20px' }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>

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
                      <th>Usuario</th>
                      <th>Email</th>
                      <th>tipo</th>
                      <th>Madre/Padre</th>
                      
                    </>
                  }
                  rowMap={(elm) => (
                    <tr key={elm._id}>
                      <td>{elm.lastname}, {elm.name} </td>
                      <td><img src={elm.profileImg} alt={elm.username} /></td>
                      <td>{elm.username}</td>
                      <td>{elm.email}</td>
                      <td>{elm.type}</td>
                      <td>{elm.parent}</td>

                      <td>
                        <Link to={`/users/${elm._id}`}><Button><FontAwesomeIcon icon={faInfo} /></Button></Link>
                        <Button
                                  onClick={() => {
                                      
                            this.setState({
                              selected: {
                                id: elm._id,
                                lastname: elm.lastname,
                                email: elm.email,
                                name: elm.name,
                                username: elm.username,
                                type: 'STUDENT',
                                parent: elm.parent,
                              },
                              showModal: true,
                            })
                                     
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
            </Container>

            <Modal
              size='lg'
              show={showModal}
              onHide={() => this.setState({ showModal: false })}
            >
              <Modal.Body>
                <UserForm
                  role='DIRECTOR'
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
          </>
        );
    
    }
}

export default Users