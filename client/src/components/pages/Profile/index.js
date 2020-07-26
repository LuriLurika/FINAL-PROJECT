import React, { Component } from "react";
import ProfileDetail from './components/profileDetail'
import './index.css'
import UserForm from '../../common/User-form'
import HeaderProfile from './components/headerProfile'
import Messages from './components/messages'
import Events from './components/events'

class ProfileEdit extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            showModal: false
        };
    }
    
    handleModal = status => this.setState({ showModal: status })



    render() {
        const { user } = this.state
        return (
            <div className="container">
            <HeaderProfile />
            <section className="row">
                <div className="col-md-6">
                    <ProfileDetail name={user.name} lastname={user.lastname} email={user.email} />
                </div>
                <div className="col-md-6">
                    <Messages />
                    <Events/>
                </div>
            </section>
                <UserForm onSaveClick={this.props.onUserChange} />
                    
                
        </div>
        )
    }
}


export default ProfileEdit
