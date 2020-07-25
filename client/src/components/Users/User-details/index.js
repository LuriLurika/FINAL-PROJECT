import React, { Component } from 'react'

import SchoolHackApi from "../../../service/SchoolHackApi"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Spinner from '../../ui/Spinner';

class UserDetails extends Component {
    constructor() {
        super()
        this.state = {
            userDetails: undefined
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {

        console.log (this.props)

        // const id = this.props.match.params.user_id

        // this.SchoolHackApi
        //     .getoneUser(id)
        //     .then((response) => this.setState({ userDetails: response.data }))
        //     .catch((err) => console.log(err));
    }

    render() {

        return (

            !this.state.userDetails ? <Spinner />:

                <Container as="main">

                    <h3>{this.state.userDetails.lastname}, {this.state.userDetails.name}</h3>

                    <Row>
                        <Col md={{ span: 5, offset: 1 }}>
                            <p><b>email</b> {this.state.userDetails.email}</p>
                            <p><b>username:</b> {this.state.userDetails.username}</p>
                            <p><b>Tipo:</b> {this.state.userDetails.type}</p>
                            <p><b>Madre / Padre:</b> {this.state.userDetails.parent}</p>
                            <hr></hr>
                            <Link className="btn btn-dark btn-md" to='/users'>Volver</Link>
                        </Col>
                        <Col md={{ span: 4, offset: 1 }}>
                            <img src={this.state.userDetails.imageUrl} alt={this.state.userDetails.username} />
                        </Col>
                    </Row>

                </Container>
        )
    }
}

export default UserDetails