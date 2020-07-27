import React, { Component } from 'react'
import CustomTable from '../../common/Table'

import SchoolHackApi from '../../../service/SchoolHackApi'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'react-bootstrap'
import Spinner from './../../ui/Spinner'


class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: undefined
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {
        this.schoolHackApi
            .getAllTeachers()
            .then(response => { this.setState({ teachers: response.data }) })
            .catch(err => console.log(err))
    }

    render() {
        const { teachers } = this.state
        return (
            <>
                <h1>Profesores</h1>  <Button><FontAwesomeIcon icon={faPlus} /></Button>

                <div className="row">
                    <div className="col-md-6">
                        {!teachers ? <Spinner /> :
                            <CustomTable
                                data={teachers}
                                header={(
                                    <>

                                        <th>Profesor</th>
                                        <th>Acciones</th>
                                    </>
                                )}
                                rowMap={elm =>

                                    <tr>
                                        <td>
                                            <img src={elm.profileImg} alt={elm.name} /> {elm.name} {elm.lastname}
                                        </td>
                                        <td>
                                            <Button><FontAwesomeIcon icon={faEdit} /></Button>
                                            <Button><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                        </td>
                                    </tr>
                                }
                            />

                        }
                    </div>
                    {/* <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>

                        <Modal.Body>
                            <SubjectForm
                                role="DIRECTOR"
                                id=""
                                title=""
                                description=""
                                teacher=""
                                onUserChanged={this.handleUsersSubmit} />
                        </Modal.Body>
                    </Modal> */}
                </div>


            </>
        )
    }
}


export default Teacher

