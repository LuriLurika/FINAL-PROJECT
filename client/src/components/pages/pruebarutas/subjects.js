import React, { Component } from 'react'

import SchoolHackApi from '../../../service/SchoolHackApi'


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
                        {this.state.subjects.map(elm => <li key={elm._id} {...elm}>{elm.title}</li>)}
                    </ul>
                }
            </>
        )
    }
}

export default Subjects