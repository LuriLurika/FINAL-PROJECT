import React, { Component } from 'react'

import { Link, NavLink } from 'react-router-dom'

import SchoolHackApi from '../../../service/SchoolHackApi'


class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: undefined,
        }
        this.SchoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {
        this.SchoolHackApi
            .getAllCourses()
            .then(response => {
                console.log(response)
                //this.setState({ courses: response.data })
            })
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