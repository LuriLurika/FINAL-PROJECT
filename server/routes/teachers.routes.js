const express = require("express");
const router = express.Router();

const Teacher = require("../models/Teacher.model");

//  /teachers --> Devuelve un listado con los datos de todos los profesores
router.get("/", (req, res, next) => {
  Teacher.find()
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /teachers/:id/users--> Devuelve un listado de los alumnos de cada profesor
router.get("/:id/users", (req, res, next) => {
  Teacher.findById(req.params.id)
    .populate("User")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /teachers/:id/courses --> Devuelve lista de cursos en los que imparte clases
router.get("/:id/courses", (req, res, next) => {
  Teacher.populate("Course")
    .findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /teachers/:id/ --> El profesor puede modificar su perfil
router.put("/:id", (req, res, next) => {

  Teacher
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err));
});

//  /teachers --> Crea un nuevo profesor
router.post("/", (req, res, next) => {
  Teacher
    .create(req.body)
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err));
});

//  /teachers/:id --> Eliminar un profesor ( primero se eliminan las relaciones y después el teacher)
router.delete("/:id", (req, res, next) => {
  Promise.all([
    Teacher.findByIdAndRemove(req.params.id),
    MaterialCourseSubjects.findByIdAndRemove({
      Teacher: req.params.id,
    }),
  ])
    .then(() => res.redirect("/"))
    .catch((err) => console.log("BBDD error", err));
});


module.exports = router;
