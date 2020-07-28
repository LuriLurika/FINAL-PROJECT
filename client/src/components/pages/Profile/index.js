import React, { Component } from "react";
import ProfileDetail from './components/profileDetail'
import './index.css'
import HeaderProfile from './components/headerProfile'
import Messages from './components/messages'
import Events from './components/events'

class Profile extends Component {

    constructor() {
        super()
        this.state = {
            user: undefined,
            showModal: false
        };
    }

    handleModal = status => this.setState({ showModal: status })



    render() {
        return (
            <div className="container">
                <HeaderProfile />
                <section className="row">
                    <div className="col-md-6">
                        <ProfileDetail name='NOMBRE' lastname='APELLIDO' email='EA@GMAIL.COM' />

                    </div>
                    <div className="col-md-6">
                        <Messages />
                        <Events />
                    </div>
                </section>
            </div>
        )
    }
}

export default Profile
