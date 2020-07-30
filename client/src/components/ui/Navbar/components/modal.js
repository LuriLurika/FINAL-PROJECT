import React from 'react'
import Modal from 'react-bootstrap/Modal'

import './modal.css'

const ModalLogin = ({ title, body }) => {


    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{body}</p>
            </Modal.Body>
        </div>
    )
}

ModalLogin.defaultProps = {
    title: 'Quiénes somos',
    body: 'Somos tal y tal y tal'


}
export default ModalLogin