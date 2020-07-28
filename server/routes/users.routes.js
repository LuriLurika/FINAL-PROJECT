const express = require("express")
const router = express.Router()

const User = require("../models/User.model")
const Course = require("../models/Course.model")
const Subject = require("../models/Subject.model")



//ALL
router.get("/", (req, res, next) => {
  User.find({ type: "STUDENT" })
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//STUDENT DETAIL
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//STUDENT-TEACHERS
router.get("/:id/teachers", (req, res, next) => {
  Course.find({ users: req.params.id })

    .then(courses => {
      return courses.length === 0 ? new Promise((resolve, reject) => resolve([]))
        : (courses.map(elm => acum = [...acum, ...elm.subjects]), resolve(acum))

    })
    .then((subject) => {

      return Subject.find({ _id: { $in: subject } }).populate('teacher', 'name')
    })
    .then((response) => {
      const teachers = response.map(elm => elm.teacher)
      res.json([...new Set(teachers)])
    })
    .catch((err) => next(err))
})

//STUDENTS-SUBJECTS
router.get("/:id/subjects", (req, res, next) => {
  Course.find({ users: req.params.id })
    .then(courses => {
      return new Promise((resolve, reject) => {
        let acum = []
        courses.map(elm => acum = [...acum, ...elm.subjects])
        resolve(acum)
      })
    })
    .then((subject) => {
      return Subject.find({ _id: { $in: subject } }).populate('user', 'name')
    })
    .then((response) => {
      res.json(response)
    })
    .catch((err) => next(err))
})

//CREATE
// router.post("/new", (req, res, next) => {

//   const { name, lastname, email, username, password, profileImg, type, parent } = req.body

//   if (req.file !== undefined) {


//     User.create({ name, lastname, email, username, password, profileImg: req.file.url, type, parent })
//       .then((response) => res.json(response))
//       .catch((err) => next(err))
//   } else {
//     User.create({ name, lastname, email, username, password, profileImg, type, parent })
//       .then((response) => res.json(response))
//       .catch((err) => next(err))

//   }
// })

//UPDATE PROFILE
router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//DELETE
router.delete("/:id", (req, res, next) => {

  User.findByIdAndDelete(req.params.id)

    .then((response) => res.json(response))
    .catch((err) => next(err))
})

module.exports = router

