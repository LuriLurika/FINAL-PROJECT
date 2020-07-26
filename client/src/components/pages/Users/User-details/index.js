import React, { Component } from 'react'

import SchoolHackApi from '../../../../service/SchoolHackApi'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Spinner from '../../../ui/Spinner'

class UserDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {

          user: {
            id: props.id,
            name: props.name,
            lastname: props.lastname,
            email: props.email,
            username: props.username,
            password: props.password,
            profileImg: props.profileImg,
            type: props.type,
            parent: props.parent,
          },
        }

        this.SchoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {

        // console.log(this.props.match.params.id);

        const id = this.props.match.params.id

        this.SchoolHackApi
            .getOneUser(id)        
            .then((response) => this.setState({ user: response.data}) /*console.log(response)*/)
            .catch((err) => console.log(err));
    }

    render() {
        const { user } = this.state;

        return (
            // <>
            //     <h1>Yaya</h1>
            //     </>

            !this.state.user ? <h3> <Spinner /> </h3> :

                <Container as="main">

                    

                    <Row>
                        <Col md={{ span: 2, offset: 1 }}> <img src={user.profileImg} alt={user.username} />
                        </Col>
                        <Col md={{ span: 7, offset: 1 }}>
                            <h1>{user.lastname}, {user.name}</h1>
                            <p><b>Username:</b> {user.username}</p>
                            <hr></hr>
                            <p><b>Email:</b> {user.email}</p>
                            <p><b>Madre/Padre</b> {user.parent}</p>
                            <p><b>Tipo:</b> {user.type}</p>
                            <hr></hr>
                            <Link className="btn btn-dark btn-md" to='/users'>Volver</Link>
                            <Link className="btn btn-dark btn-md" to='/users'>modificar</Link>
                        </Col>
                        
                    </Row>

                </Container>
        )
    }
}


   export default UserDetails