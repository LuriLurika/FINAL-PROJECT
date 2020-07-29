import React from 'react'

import Toast from 'react-bootstrap/Toast'

import './index.css'

const Toastpage = ({ visible, text, handleToast }) => {
    return (
        <Toast className='toast' show={visible} onClose={() => handleToast(false)} delay={3000} autohide>
            <Toast.Header> <strong className="mr-auto">LEL School</strong> </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
        </Toast>
    )
}

export default Toastpage