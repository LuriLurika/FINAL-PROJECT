import React from 'react'
import Col from 'react-bootstrap/Col'


const HeaderProfile = ({ name }) => {

  return (
    <Col md={12} className='header-page'>
      <h1>Bienvenid@ {name}</h1>
    </Col>

  )
}

export default HeaderProfile