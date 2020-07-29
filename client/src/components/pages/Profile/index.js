import React, { Component } from "react";
import ProfileDetail from './components/profileDetail'
import './index.css'
import HeaderProfile from './components/headerProfile'
import Messages from './components/messages'
import Events from './components/events'
import SchoolHackApi from "../../../service/SchoolHackApi";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Profile extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
          user: prop.loggedInUser,
          unreadMessages: 0,
          showModal: false,
        };
        this.schoolHackApi = new SchoolHackApi();
    }
    componentDidMount = () => this.getPendingMessages(this.state.user._id)
    handleModal = status => this.setState({ showModal: status })

    getPendingMessages = id => {
      this.schoolHackApi.getAllReceivedMessages(id)
        .then(response => {
       
          this.setState({ unreadMessages: response.data.filter(elm => !elm.readed).length })
        })
    }

    render() {
        const { user, unreadMessages } = this.state;
        return (
          <Container>
            <HeaderProfile profileImg={user.profileImg} name={user.name} />
            <Row as="section">
              <Col md={6}>
                <ProfileDetail
                  profileImg={user.profileImg}
                  name={user.name}
                  lastname={user.lastname}
                  email={user.email}
                  parents={user.parents}
                />
              </Col>
              <Col md={6}>
                <Messages unreadMessages={unreadMessages} />
                <Events />
              </Col>
            </Row>
          </Container>
        );
    }
}

export default Profile
