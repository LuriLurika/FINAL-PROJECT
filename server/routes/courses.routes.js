const express = require("express");
const router = express.Router();

const Course = require("../models/Course.model");
const User = require("../models/User.model");
const Subject = require("../models/Subject.model");



//  /courses --> Devuelve todas las cursos
router.get("/", (req, res, next) => {
  Course.find()
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /courses/:id/subjects --> Devuelve la lista de asignaturas pertenecientes al curso

router.get("/:id/subjects", (req, res, next) => {
  Course.findById()
    .populate(Subject)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /courses/:id/users --> Devuelve la lista de usuarios(todos, en el front hacemos filter para solo ver los tipo alumno) pertenecientes al curso

router.get("/:id/users", (req, res, next) => {
  Course.findById()
    .populate(User)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /courses --> Crea un curso nuevo. Los Subjects será un array de String con los Objects_Id de las asignaturas. ( Por cada object ID del curso, iteramos con un forEach y en una promesa gestionamos lo que nos devuelve)

router.post("/", (req, res, next) => {
  Course.create(req.body)
    .populate(Subject)
    .populate(User)
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err));
});

//  /courses/:id --> Modifica el nombre de la courses y modifica los subjects con el /:id

router.put("/:id", (req, res, next) => {
  const { title, subjects, users } = req.body;

  Course.findByIdAndUpdate(
    req.params.id,
    { title, subjects, users },
    { new: true }
  )
    .populate(Subject)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /courses/:id --> Eliminar un curso ( primero se eliminan las relaciones y después el curso)

router.delete("/:id", (req, res, next) => {

  Course.findByIdAndRemove(req.params.id)
    .then((response) => res.json(response)) //status
    .catch((err) => console.log("BBDD error", err));
});

module.exports = router;
