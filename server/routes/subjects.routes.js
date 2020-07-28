const express = require("express")
const router = express.Router()

const Subject = require("../models/Subject.model")
const MaterialCourseSubjects = require("../models/Tables/Material-Course-Subject.table")


//ALL
router.get("/", (req, res, next) => {
  Subject.find()
    .populate('teacher')
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//UPDATE
router.put("/:id", (req, res, next) => {
   const { title, teacher, description, subjectsMaterials } = req.body

  Subject.findByIdAndUpdate(req.params.id, { title, teacher, description, subjectsMaterials }, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//DELETE
router.delete("/:id", (req, res, next) => {
 
  Subject.findByIdAndDelete(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//CREATE
router.post("/", (req, res, next) => {
  Subject.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err))
})


module.exports = router
