const express = require("express");
const router = express.Router();

const Event = require("../models/Event.model");
// const User = require("../models/User.model");

// const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
//     message: "Area Restringida!"
// })


//Crear evento ( solo los pueden crear el DIRECTOR Y el TEACHER) -------checkRole(['DIRECTOR', 'TEACHER']),

router.post('/', (req, res) => {

    const { title, description, participants, eventDate } = req.body
    Event
        .create({title, description, participants, eventDate, creator: req.user.id})
        .then((response) => res.json(response))
        .catch((err) => next(err));
})

//Recuperar todos los eventos ( todos menos el STUDENT pueden los eventos en los que participa) checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),
router.get("/", (req, res, next) => {
    Event
        .find()
        .populate('creator')
        .populate('participants')
        .then((response) => res.json(response))
        .catch((err) => next(err));
});


//Recuperar un evento( todos menos el STUDENT pueden el eventos en el que participa) checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),
router.get('/:id',(req, res) => {
    Event
        .findById(req.params.id)
        .populate('creator')
        .populate('participants')
        .then((response) => res.json(response))
        .catch((err) => next(err));
})

//Editar evento ( solo el director y el teacher pueden modificar) checkRole(['DIRECTOR', 'TEACHER']),
router.put("/:id", (req, res, next) => {
    Event
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) => res.json(response), req.body)
        .catch((err) => next(err));
});


//Borrar evento( solo el director y el teacher pueden eliminar) checkRole(['DIRECTOR', 'TEACHER']),
router.delete("/:id", (req, res, next) => {
        Event.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response)) //status
        .catch((err) => console.log("BBDD error", err));
});


module.exports = router;