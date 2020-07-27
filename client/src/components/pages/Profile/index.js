import React, { Component } from "react";
import ProfileDetail from './components/profileDetail'
import './index.css'
import UserForm from '../../common/User-form'
import HeaderProfile from './components/headerProfile'
import Messages from './components/messages'
import Events from './components/events'
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";

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
// UserForm.defaultProps = user = {
//     name: 'Laura',
//     lastname: 'Martínez',
//     email: 'laura@gmail.com',
//     profileImg:  "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595247178/School%20Hack/images_rtgo7j.jpg"
// };

export default ProfileEdit
