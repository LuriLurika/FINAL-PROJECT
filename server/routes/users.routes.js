const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

//Devuelve un listado con los datos de todos los alumnos
router.get("/", (req, res, next) => {
  User.find()
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
    //.populate('Subject')
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

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
  ])
    .then(() => res.redirect("/"))
    .catch((err) => console.log("BBDD error", err));
});

module.exports = router

