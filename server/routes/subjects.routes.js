const express = require("express")
const router = express.Router()

const Subject = require("../models/Subject.model")
const MaterialCourseSubjects = require("../models/Tables/Material-Course-Subject.table")


//VER TODAS LAS ASIGNATURAS
router.get("/", (req, res, next) => {
  Subject.find()
    .populate('teacher')
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//MODIFICAR UNA ASIGNATURA
router.put("/:id", (req, res, next) => {
   const { title, teacher, description, subjectsMaterials } = req.body

  Subject.findByIdAndUpdate(req.params.id, { title, teacher, description, subjectsMaterials }, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//ELIMINAR UNA ASIGNATURA
router.delete("/:id", (req, res, next) => {
 
  Subject.findByIdAndDelete(req.params.id)
      
    //MaterialCourseSubjects.findByIdAndDelete({
      //Subjects: req.params.id,
    //}),
  
    .then((response) => res.json(response))
    .catch((err) => console.log("BBDD error", err))
})

//CREAR ASIGNATURA
router.post("/", (req, res, next) => {
  console.log(req.body)
  Subject.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err))
})


module.exports = router
