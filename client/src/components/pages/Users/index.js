import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'


import CustomTable from '../../common/Table'
import UserForm from '../../common/Forms/User-form'
import Spinner from '../../ui/Spinner'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: undefined,
            showModal: false
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => this.updatedUsersList()


    updatedUsersList = () => {
        this.schoolHackApi
            .getAllUsers()
            .then(response => { this.setState({ users: response.data }) })
            .catch(err => console.log(err))
    }

    saveUserInfo = () => {

    }


    handleModal = status => this.setState({ showModal: status })

    handleUserDelete = (id) => {
        this.schoolHackApi
            .deleteUser(id)
            .then(() => {
                this.setState({ users: this.state.users.filter((elm) => elm._id !== id) })
            })
    }



    handleUsersSubmit = newUserInfo => {

        this.schoolHackApi.createUser(newUserInfo)
            .then(() => {
                this.updatedUsersList()
                this.handleModal(false)
            }).catch(err => console.log('error en createUser', err))
    }

    render() {

        const { users } = this.state;

        return (
            <>

                <Container as="main">
                    <h3>Estudiantes:</h3>

                    {/*this.props.loggedInUser && */}
                    <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }} > <FontAwesomeIcon icon={faPlus} /> </Button>


                    {
                        !this.state.users ? <h3> <Spinner /></h3> :
                            <CustomTable
                                data={users}
                                header={(
                                    <>
                                        <th>Nombre</th>
                                        <th>Foto</th>
                                        <th>Usuario</th>
                                        <th>Email</th>
                                        <th>tipo</th>
                                        <th>Madre/Padre</th> {/*Si es profesor no necesitamos este campo*/}
                                    </>
                                )}
                                rowMap={elm =>

                                    <tr>
                                        <td>
                                            {elm.lastname}, {elm.name}
                                        </td>
                                        <td>
                                            <img src={elm.profileImg} alt={elm.username} />
                                        </td>

                                        <td>
                                            {elm.username}
                                        </td>
                                        <td>
                                            {elm.email}
                                        </td>
                                        <td>
                                            {elm.type}
                                        </td>
                                        <td>
                                            {elm.parent}
                                        </td>

                                        <td>
                                            <Button><FontAwesomeIcon icon={faEdit} /></Button>
                                            <Button onClick={() => this.handleUserDelete(elm._id)} ><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                        </td>
                                    </tr>
                                }
                            />
                    }

                </Container>

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>

                    <Modal.Body>
                        <UserForm
                            role="DIRECTOR"
                            id=""
                            lastname=""
                            email=""
                            name=""
                            username=""
                            password=""
                            type="STUDENT"
                            parent=""
                            onUserChanged={this.handleUsersSubmit} />
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default Users