import React, { Component } from 'react'

import SchoolHackApi from '../../../service/SchoolHackApi'


class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: undefined,
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {
        this.schoolHackApi
            .getAllCourses()
            .then(response => { this.setState({ courses: response.data }) })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h1>Courses</h1>

                {!this.state.courses ? <p>CARGANDO</p> :
                    <ul>
                        {this.state.courses.map(elm => <li key={elm._id} {...elm}>{elm.title}</li>)}
                    </ul>
                }
            </>
        )
    }
}

export default Courses