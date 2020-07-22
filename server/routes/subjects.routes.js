const express = require("express");
const router = express.Router();

const Subject = require("../models/Subject.model");
const MaterialCourseSubjects = require("../models/Tables/Material-Course-Subject.table");



//  /Subjects --> Devuelve un listado con los datos de todos las asignaturas
router.get("/", (req, res, next) => {
  Subject.find()
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /Subjectss/:id/ --> Modificar el nombre de la asignatura
router.put("/:id", (req, res, next) => {
   const { title, teacher, subjectsMaterials } = req.body;

  Subject.findByIdAndUpdate(req.params.id, { title, teacher, subjectsMaterials }, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /Subjectss/:id --> Eliminar una asignatura ( con las relaciones )
router.delete("/:id", (req, res, next) => {
  Promise.all([
    Subject.findByIdAndDelete(req.params.id),
    MaterialCourseSubjects.findByIdAndDelete({
      Subjects: req.params.id,
    }),
  ])
    .then((response) => res.json(response))
    .catch((err) => console.log("BBDD error", err));
});

//  /Subjects --> Crea un nuevo subject
router.post("/", (req, res, next) => {
  Subject.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

module.exports = router;
