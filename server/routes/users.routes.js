const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");


const MaterialCourseSubjects = require("../models/Tables/Material-Course-Subject.table");
const ParentStudents = require("../models/Tables/Parents-Students.table");
const CourseSubjects = require("../models/Tables/Course-Subject.table");
const UserCourse = require("../models/Tables/User-Course.table");

//Devuelve un listado con los datos de todos los alumnos ***ok***
router.get("/", (req, res, next) => {
  User.find({ type: "STUDENT" })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Devuelve listado de los profesores de cada alumno
router.get("/:id/teachers", (req, res, next) => {
  Course.find({ users: req.params.id })
    .then(courses => {
      if (courses.length === 0) {
        return new Promise((resolve, reject) => resolve([])) //en caso de no tener courses asignado devuelve array vacío
      } else {
        console.log(courses)
        let acum = []
        courses.map(elm => acum = [...acum, ...elm.subjects])
        return acum
      }
    })
    .then((subject) => subject.map(elm => Subject.find({ id: elm })))
    //.populate('Teacher') ({ subjects: elm.id })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Devuelve listado de asignaturas de cada alumno
router.get("/:id/subjects", (req, res, next) => {
  User.findById(req.params.id)
    .populate('Course') ///?
    // userid > courseid > subjects[]
    .then((response) => res.json(response))
    .catch((err) => next(err));
});



//Crea un nuevo usuario (en front capamos para que solo pueda crearlo el director) ***ok***
router.post("/new", (req, res, next) => {
  User.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//El usuario puede modificar su perfil ***ok***
router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Eliminar un user(primero se eliminan las relaciones y después el usuario) ***ok***
router.delete("/:id", (req, res, next) => {
  Promise.all([
    User.findByIdAndRemove(req.params.id),
    MaterialCourseSubjects.findOneAndRemove({
      user: req.params.id,
    }),
    ParentStudents.findOneAndRemove({
      user: req.params.id,
    }),
    CourseSubjects.findOneAndRemove({
      user: req.params.id,
    }),
    UserCourse.findOneAndRemove({
      user: req.params.id,
    }),
  ])
    .then((response) => res.json(response)) //status
    .catch((err) => console.log("BBDD error", err));
});

module.exports = router

