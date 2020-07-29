const express = require("express")
const router = express.Router()

const Course = require("../models/Course.model")
const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
  message: "Area Restringida!"
})

//  ALL

router.get("/", checkRole(['DIRECTOR']),(req, res, next) => {
  Course.find().sort({ title: 1 })
    .populate('subjects')
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

// COURSE-SUBJECTS


router.get("/:id/subjects", (req, res, next) => {
  Course
    .findById(req.params.id)
    .populate('subjects')
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

// STUDENT-COURSE


router.get("/:id/users", checkRole(['DIRECTOR', 'TEACHER']), (req, res, next) => {
  Course
    .findById(req.params.id)
    .populate('users')
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

// CREATE


router.post("/", checkRole(['DIRECTOR']),(req, res, next) => {

const {title, subjects, user} = req.body

  Course.create({title, subjects, user})

    .then((response) => res.json(response), req.body)
    .catch((err) => next(err))
})

// UPDATE
 

router.put("/:id", checkRole(['DIRECTOR']),(req, res, next) => {
  const { title, subjects, users } = req.body

  Course.findByIdAndUpdate(
    req.params.id,
    { title, subjects, users },
    { new: true }
  )
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//DELETE
router.delete("/:id", checkRole(['DIRECTOR']),(req, res, next) => {

  Course.findByIdAndRemove(req.params.id)
    .then((response) => res.json(response)) 
    .catch((err) => next(err))
})

module.exports = router
