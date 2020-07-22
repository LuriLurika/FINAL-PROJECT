const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const MaterialCourseSubjects = require("../models/Tables/Material-Course-Subject.table");
const Course = require("../models/Course.model");

const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
  message: "Area Restringida!"
})

//  /teachers --> Devuelve un listado con los datos de todos los profesores ( solo tiene acceso el Director) checkRole(['DIRECTOR']), 
router.get("/", (req, res, next) => {
  User.find({ type: "TEACHER" }) //FILTRADO EN SERVER
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /teachers/:id/users--> Devuelve un listado de los alumnos de cada profesor
// primero lsitar asignatuars de profe, luego listar curso y luego user-student de asignatura dada por el profe ( tienen acceso el Director y el profesor)
// checkRole(['DIRECTOR', 'TEACHER']), 

router.get("/:id/users", (req, res, next) => {
  User.findById(req.params.id)
    .populate('User')
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /teachers/:id/courses --> Devuelve lista de cursos en los que imparte clases
// igual que anterior, sacar lista cursos del profe checkRole(['DIRECTOR', 'TEACHER']),
router.get("/:id/courses",  (req, res, next) => {
  User
    .populate("Course")
    .findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /teachers/:id/ --> El profesor puede modificar su perfil ( tienen acceso el Director y el Profesor)checkRole(['DIRECTOR', 'TEACHER']), 
router.put("/:id", (req, res, next) => {

  User
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err));
});

//  /teachers --> Crea un nuevo profesor ( tiene acceso el Director)checkRole(['DIRECTOR']),
router.post("/",  (req, res, next) => {
  User
    .create(req.body)
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err));
});

//  /teachers/:id --> Eliminar un profesor ( primero se eliminan las relaciones y después el teacher)( tiene acceso el Director)checkRole(['DIRECTOR']), 
router.delete("/:id", (req, res, next) => {
  Promise.all([
    User.findByIdAndRemove(req.params.id),
    MaterialCourseSubjects.findByIdAndRemove({
      Teacher: req.params.id,
    }),
  ])
    .then(() => res.redirect("/"))
    .catch((err) => console.log("BBDD error", err));
});


module.exports = router;
