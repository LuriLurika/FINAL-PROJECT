import axios from 'axios'

class SchoolHackApi {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  getAllCourses = () => this.service.get("/courses");
  getAllSubjects = () => this.service.get("/subjects");
  getAllTeachers = () => this.service.get("/teachers");
  getAllUsers = () => this.service.get("/users");
  getOneUser = (id) => this.service.get(`/users/${id}`);
  createUser = (user) => this.service.post("/users/new", user);
    
  deleteSubject = (id) => this.service.delete(`/subjects/${id}`);
  updateSubject = (subject) => this.service.put(`/subjects/${subject.id}`, subject);
  createSubject = (subject) => this.service.post('/subjects', subject)
    
  updateUser = (id) => this.service.put(`/users/${id}`);
  deleteUser = (id) => this.service.delete(`/users/${id}`);
  getAllEvents = () => this.service.get("/events");
  createEvents = (event) => this.service.post("/events", event);
  getAllMessages = () => this.service.get("/messages");
  createMessages = (message) => this.service.post("/messages", message);
}

export default SchoolHackApi