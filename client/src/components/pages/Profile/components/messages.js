import React from 'react'

import Col from 'react-bootstrap/Col'

const Messages = ({title, body, sendedBy}) => {

    return (
        <Col className="green">


            <h3>Messages</h3>
            <p>Recibido por {sendedBy}</p>
            <p>{title}</p>
            <p>{body}</p>


        </Col>

    )
}

Messages.defaultProps = {
    title: 'Tarea Jueves 3 de septiembre',
    body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim reiciendis tenetur vero dignissimos, architecto non neque accusantium fuga mollitia, veritatis reprehenderit quisquam sint consequuntur quis consectetur nulla perspiciatis quo odit.',
    sendedBy: 'Angel',


}
export default Messages