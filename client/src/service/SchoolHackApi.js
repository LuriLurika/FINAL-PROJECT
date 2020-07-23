import axios from 'axios'

class SchoolHackApi {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true
        })
    }

    getAllCourses = () => this.service.get('/courses')
    getAllSubjects = () => this.service.get('/subjects')
    getAllTeachers = () => this.service.get('/teachers')
    getAllUsers = () => this.service.get('/users')
}

export default SchoolHackApi