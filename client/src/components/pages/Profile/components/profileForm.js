import React, { Component } from "react"
import ProfileDetail from "./profileDetail"

class ProfileEditForm extends Component {
    constructor() {
        super()
        this.state = {
          name: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
          profileImg: ""
        }
    }
    render() {
        return (<button onClick={() => this.props.onSaveClick(this.state)}> Guardar</button>)
    }
}

export default ProfileEditForm


