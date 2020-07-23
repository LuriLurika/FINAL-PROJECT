import React, { Component } from 'react'

import SchoolHackApi from '../../../service/SchoolHackApi'


class Teachers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: undefined,
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {
        this.schoolHackApi
            .getAllTeachers()
            .then(response => { this.setState({ teachers: response.data }) })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h1>Teachers</h1>

                {!this.state.teachers ? <p>CARGANDO</p> :
                    <ul>
                        {this.state.teachers.map(elm => <li key={elm._id} {...elm}>{elm.name} {elm.lastname}</li>)}
                    </ul>
                }
            </>
        )
    }
}

export default Teachers