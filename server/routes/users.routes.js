const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
  message: "Area Restringida!"
})

//Devuelve un listado con los datos de todos los alumnos ( tiene acceso el Director)checkRole(['DIRECTOR']),
router.get("/",  (req, res, next) => {
  User.find()
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Devuelve listado de los profesores de cada alumno (Tienen acceso los Parents y Director )checkRole(['DIRECTOR', 'PARENTS']),
router.get("/:id/teachers",  (req, res, next) => {
  User.findById(req.params.id)
    //.populate('Teacher')
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Devuelve listado de asignaturas de cada alumno(Tienen acceso los Parents y Director )checkRole(['DIRECTOR', 'PARENTS']), 
router.get("/:id/subjects", (req, res, next) => {
  User.findById(req.params.id)
    //.populate('Subject')
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Crea un nuevo usuario (en front capamos para que solo pueda crearlo el director)checkRole(['DIRECTOR']), 
router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//El usuario puede modificar su perfil ( todos tienen acceso)
router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//Eliminar un user(primero se eliminan las relaciones y después el usuario) ( solo tiene acceso el Director)checkRole(['DIRECTOR']), 
router.delete("/:id", (req, res, next) => {
  Promise.all([
    User.findByIdAndRemove(req.params.id),
    MaterialCourseSubjects.findByIdAndRemove({
      user: req.params.id,
    }),
    ParentStudents.findByIdAndRemove({
      user: req.params.id,
    }),
  ])
    .then(() => res.redirect("/"))
    .catch((err) => console.log("BBDD error", err));
});

module.exports = router

