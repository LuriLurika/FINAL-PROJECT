import axios from 'axios'

class SchoolHackApi {

  constructor() {

    this.service = axios.create({

      baseURL: "http://localhost:5000/api",
      withCredentials: true,
      
    })

  }

  getAllCourses = () => this.service.get("/courses")
  
  getAllTeachers = () => this.service.get("/teachers")

  getAllUsers = () => this.service.get("/users");
  getOneUser = (id) => this.service.get(`/users/${id}`)
  createUser = (user) => this.service.post("/users/new", user)
  updateUser = (user) => this.service.put(`/users/${user.id}`, user)
  deleteUser = (id) => this.service.delete(`/users/${id}`)  

  getAllSubjects = () => this.service.get("/subjects")
  deleteSubject = (id) => this.service.delete(`/subjects/${id}`)
  updateSubject = (subject) => this.service.put(`/subjects/${subject.id}`, subject)
  createSubject = (subject) => this.service.post('/subjects', subject)
    
  
  getAllEvents = () => this.service.get("/events")
  createEvents = (event) => this.service.post("/events", event)

  getAllMessages = () => this.service.get("/messages")
  createMessages = (message) => this.service.post("/messages", message)
}

export default SchoolHackApi