const express = require("express")
const router = express.Router()

const User = require("../models/User.model")
const MaterialCourseSubjects = require("../models/Tables/Material-Course-Subject.table")
const Course = require("../models/Course.model")
const Subject = require("../models/Subject.model")

/*const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
  message: "Area Restringida!"
})*/

//LISTADO DE TODOS LOS PROFESORES Y/O DIRECTORES
router.get("/", (req, res, next) => {
  User.find({ $or: [{ type: "DIRECTOR" }, { type: "TEACHER" }]})
    .then((response) => res.json(response))
    .catch((err) => next(err))
})

//LISTADO DE LOS ALUMNOS DE CADA PROFESOR 
router.get("/:id/users", (req, res, next) => {
  console.log(req.params.id)
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

//LISTADO DE CURSOS EN LOS QUE IMPLANTE CLASES CADA PROFESOR
router.get("/:id/courses", (req, res, next) => {
  
  Subject.find({ teacher: req.params.id }) 
    .then(subjects => {
      return subjects.length === 0 ? new Promise((resolve, reject) => resolve([]))
        : Course.find({ $or: subjects.map(elm => ({ subjects: elm.id })) }).populate('users').populate('subjects')
      
    })
    .then(courses => {
      res.json(courses)
    })
    .catch((err) => next(err))
})

//MODIFICAR PERFIL

router.put("/:id", (req, res, next) => {

  User
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err))
})

//CREAR NUEVO PROFESOR (SOLO EL DIRECTOR)

router.post("/new", (req, res, next) => {
  User
    .create(req.body)
    .then((response) => res.json(response), req.body)
    .catch((err) => next(err))
})

//ELIMINAR PROFESOR (SOLO EL DIRECTOR)

router.delete("/:id", (req, res, next) => {
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
