const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");


const MaterialCourseSubjects = require("../models/Tables/Material-Course-Subject.table");
const ParentStudents = require("../models/Tables/Parents-Students.table");
const CourseSubjects = require("../models/Tables/Course-Subject.table");
const UserCourse = require("../models/Tables/User-Course.table");

//Devuelve un listado con los datos de todos los alumnos
router.get("/", (req, res, next) => {
  User.find({ type: "STUDENT" })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Devuelve listado de los profesores de cada alumno
router.get("/:id/teachers", (req, res, next) => {
  User.findById(req.params.id)
    //.populate('Teacher')
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

//5f16fcc0c8aa5819f40de310

router.get("/pruebateachers/:id", (req, res, next) => {
  Promise.all([
    User.findById(req.params.id),
    Subject.find({ teacher: req.params.id }),
    console.log(Subject.find({ teacher: req.params.id }))
  ])
    .then((response) => {
      console.log(response)
      res.json(response)
    })
    .catch((err) => next(err));
})

function getSubjectssFromStudent(id) {
  return new Promise(resolve => {
    User.findById(id)
      .then((data) => {
        console.log(data._id)
        return getSubjects(data._id)
      })
  })
}

function getSubjects(id) {
  return new Promise(resolve => {
    Course.find({ users: id })
      .then((data) => {
        console.log(data)
        return resolve(data)
      })
  })
}

router.get("/pruebasubjects/:id", (req, res, next) => {
  // User.findById(req.params.id)
  async function asyncCall() {
    const resultSubjects = await getSubjectssFromStudent(req.params.id)
    console.log('llamada async', resultSubjects)
    return resultSubjects
  }

  asyncCall().then(data => {
    res.json(data)
  })


    .catch((err) => next(err));
})



//Crea un nuevo usuario (en front capamos para que solo pueda crearlo el director)
router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//El usuario puede modificar su perfil
router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Eliminar un user(primero se eliminan las relaciones y después el usuario)
router.delete("/:id", (req, res, next) => {
  Promise.all([
    User.findByIdAndRemove(req.params.id),
    MaterialCourseSubjects.findByIdAndRemove({
      user: req.params.id,
    }),
    ParentStudents.findByIdAndRemove({
      user: req.params.id,
    }),
    CourseSubjects.findByIdAndRemove({
      user: req.params.id,
    }),
    UserCourse.findByIdAndRemove({
      user: req.params.id,
    }),
  ])
    .then((response) => res.json(response)) //status
    .catch((err) => console.log("BBDD error", err));
});

module.exports = router

