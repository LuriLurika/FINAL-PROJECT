import React from 'react'
import HeaderProfile from './components/headerProfile'
import ProfileDetail from './components/profileDetail'
import Messages from './components/messages'
import Events from './components/events'
import './index.css'


const Profile = props => {

    return (
        <div className="container">
            <HeaderProfile />
            <section className="row">
                <div className="col-md-6">
                    <ProfileDetail />
                </div>
                <div className="col-md-6">
                    <Messages />
                    <Events/>
                </div>
            </section>
               
                    
                
        </div>
        
    )
}

export default Profile