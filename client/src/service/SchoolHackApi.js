import axios from 'axios'

class SchoolHackApi {

    constructor() {

        this.service = axios.create({
            // baseURL: 'http://localhost:5000/api',
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getAllCourses = () => this.service.get('/courses')
    getAllSubjects = () => this.service.get('/subjects')
    getAllTeachers = () => this.service.get('/teachers')
    getAllUsers = () => this.service.get('/users')
    createUser = user => this.service.post('/users/new', user)
    getAllEvents = () => this.service.get('/events')
    createEvents = event => this.service.post('/events',event)
    getAllMessages = () => this.service.get('/messages')
    createMessages = message => this.service.post('/messages', message)

}

export default SchoolHackApi