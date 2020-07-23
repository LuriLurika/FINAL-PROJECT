import React, { Component } from 'react'

import SchoolHackApi from '../../../service/SchoolHackApi'


class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: undefined,
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {
        this.schoolHackApi
            .getAllUsers()
            .then(response => { this.setState({ users: response.data }) })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h1>Users</h1>

                {!this.state.users ? <p>CARGANDO</p> :
                    <ul>
                        {this.state.users.map(elm => <li key={elm._id} {...elm}>{elm.name} {elm.lastname}</li>)}
                    </ul>
                }
            </>
        )
    }
}

export default Users