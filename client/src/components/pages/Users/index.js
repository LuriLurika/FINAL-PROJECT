import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'

import UserCard from './User-Card'
import UserForm from '../../common/User-form'
import Spinner  from '../../ui/Spinner'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
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

    // deleteUser = id => {
    //     const UsersCopy = [...this.state.movies]
    //     UsersCopy.splice(id, 1)
    //     this.setState({
    //         users: UsersCopy
    //     })
    // }


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

    handleUsersSubmit = newUserInfo => {
       
        this.schoolHackApi.createUser(newUserInfo)
            .then(() => {
                this.updatedUsersList()
                this.handleModal(false)
            }).catch(err => console.log('error en createUser', err))
    }

    render() {
        return (
            <>
                
                <Container as="main">
                    <h3>Estudiantes:</h3>
                    
                    {/*this.props.loggedInUser && */}
                    <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }} > Nuevo estudiante </Button>
                    

                    {
                        !this.state.users ? <h3> <Spinner /></h3>:

                            <Row>
                                {this.state.users.map((elm,idx) => <UserCard  key={elm._id} {...elm} removeUser={() => this.deleteUser(idx)}/>)}
                            </Row>

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