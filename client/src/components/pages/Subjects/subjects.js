import React, { Component } from 'react'

import SchoolHackApi from '../../../service/SchoolHackApi'
import { Link } from 'react-router-dom' 



class Subjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjects: undefined,
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => {
        this.schoolHackApi
            .getAllSubjects()
            .then(response => { this.setState({ subjects: response.data }) })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h1>Subjects</h1>

                {!this.state.subjects ? <p>CARGANDO</p> :
                    <ul>
                        {this.state.subjects.map(elm => <li><Link key={elm._id} {...elm}>{elm.title}</Link></li>)}
                    </ul>
                }
            </>
        )
    }
}

export default Subjects