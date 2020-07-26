import React, { Component } from 'react'
import CustomTable from '../../common/Table'
import SubjectForm from './edit-subjects'

import SchoolHackApi from '../../../service/SchoolHackApi'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'react-bootstrap'


class Subjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjects: undefined,
            description: ''
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {
        this.schoolHackApi
            .getAllSubjects()
            .then(response => { this.setState({ subjects: response.data }) })
            .catch(err => console.log(err))
    }

    render() {
        const {subjects, description} = this.state
        return (
            <>
                <h1>Subjects</h1>  <Button><FontAwesomeIcon icon={faPlus} /></Button>

                <div className="row">
                <div className="col-md-6">
                    {!subjects ? <p>CARGANDO</p> :
                            <CustomTable
                                data={subjects}
                                header={(
                                    <>
                                        <th>Asignatura</th>
                                        <th>Profesor</th>
                                        <th>Acciones</th>
                                    </>
                                )}
                                rowMap={elm =>
                                    
                                    <tr>
                                        <td>
                                            {elm.title}
                                        </td>
                                        <td>
                                            <img src={elm.teacher.profileImg} alt={elm.teacher.name} /> {elm.teacher.name} {elm.teacher.lastname} 
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


export default Subjects

