const express = require("express")
const router = express.Router()

const User = require("../models/User.model")
const MaterialCourseSubjects = require("../models/Tables/Material-Course-Subject.table")
const Course = require("../models/Course.model")
const Subject = require("../models/Subject.model")


const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
  message: "Area Restringida!"
})

//ALL
router.get("/", checkRole(['DIRECTOR']), (req, res, next) => {
  User.find({ $or: [{ type: "DIRECTOR" }, { type: "TEACHER" }] })
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//TEACHER-STUDENTS
router.get("/:id/users", checkRole(['DIRECTOR', 'TEACHER']), (req, res, next) => {
  
  Subject.find({ teacher: req.params.id }) 
    .then(subjects => {
      return subjects.length === 0 ? new Promise((resolve, reject) => resolve([]))
        : Course.find({ $or: subjects.map(elm => ({ subjects: elm.id })) }).populate('users')

    })
    .then(courses => {
      let acum = []
      courses.forEach(elm => acum = [...acum, ...elm.users])
      res.json(acum)
    })
    .catch((err) => next(err))
})

//TEACHER-COURSES
router.get("/:id/courses", checkRole(['DIRECTOR', 'TEACHER']), (req, res, next) => {
  Subject.find({ teacher: req.params.id }).populate('teacher')
    .then(subjects => {
      return subjects.length === 0 ? new Promise((resolve, reject) => resolve([]))
        : Course.find({ $or: subjects.map(elm => ({ subjects: elm._id })) }).populate('users').populate('subjects')

    })
    .then(courses => {
      res.json(courses)
    })
    .catch((err) => next(err))
})

//UPDATE PROFILE

router.put("/:id", checkRole(['DIRECTOR', 'TEACHER']), (req, res, next) => {

  User
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err))
})

//CREATE NEW THEACHER

router.post("/new", checkRole(['DIRECTOR']), (req, res, next) => {
  User
    .create(req.body)
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err))
})

//DELETE

router.delete("/:id", checkRole(['DIRECTOR']), (req, res, next) => {
  Promise.all([
    User.findByIdAndRemove(req.params.id),
    MaterialCourseSubjects.findOneAndRemove({
      Teacher: req.params.id,
    }),
  ])
    .then((response) => res.json(response))
    .catch((err) => next(err))
})


module.exports = router
