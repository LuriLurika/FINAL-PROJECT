const express = require("express");
const router = express.Router();

const Subject = require("../models/Subject.model");

//  /Subjectss --> Devuelve un listado con los datos de todos las asignaturas
router.get("/", (req, res, next) => {
  Subject.find()
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /Subjectss/:id/ --> Modificar el nombre de la asignatura
router.put("/:id", (req, res, next) => {
   const { title } = req.body;

  Subject.findByIdAndUpdate(req.params.id, { title }, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//  /Subjectss/:id --> Eliminar una asignatura ( con las relaciones )
router.delete("/:id", (req, res, next) => {
  Promise.all([
    Subject.findByIdAndRemove(req.params.id),
    subjectsMaterials.findOneAndRemove({
      Subjects: req.params.id,
    }),
  ])
    .then(() => res.redirect("/"))
    .catch((err) => console.log("BBDD error", err));
});

//  /Subjects --> Crea un nuevo profesor
router.post("/", (req, res, next) => {
  Subject.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

module.exports = router;
