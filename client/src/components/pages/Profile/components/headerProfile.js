import React from 'react'
import Col from 'react-bootstrap/Col'


const HeaderProfile = ({ name, profileImg }) => {

    return (
        <Col className="orange">
          <img src={profileImg} alt=""/>
          <h3>Bienvenid@ {name}</h3>


        </Col>

    )
}

export default HeaderProfile