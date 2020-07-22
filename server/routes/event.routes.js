const express = require("express");
const router = express.Router();

const Event = require("../models/Event.model");
const User = require("../models/User.model");

const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
    message: "Area Restringida!"
})


//Crear evento ( solo los pueden crear el DIRECTOR Y el TEACHER)

router.post('/', checkRole(['DIRECTOR', 'TEACHER']),(req, res) => {
    //title, description, creator, participants, eventDate
    Event
        .create(req.body)
        .then((response) => res.json(response))
        .catch(err => console.log("Error en la BBDD", err))
})

//Recuperar todos los eventos ( todos menos el STUDENT pueden los eventos en los que participa)
router.get("/", checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),(req, res, next) => {
    Event
        .find()
        .populate(User)
        .then((response) => res.json(response))
        .catch((err) => next(err));
});


//Recuperar un evento( todos menos el STUDENT pueden el eventos en el que participa)
router.get('/:id', checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),(req, res) => {
    Event
        .findById(req.params.id)
        .populate(User)
        .then((response) => res.json(response))
        .catch(err => console.log("Error en la BBDD", err))
})

//Editar evento ( solo el director y el teacher pueden modificar)
router.put("/:id", checkRole(['DIRECTOR', 'TEACHER']), (req, res, next) => {
    Event
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) => res.json(response), req.body)
        .catch((err) => next(err));
});


//Borrar evento( solo el director y el teacher pueden eliminar)
router.delete("/:id", checkRole(['DIRECTOR', 'TEACHER']), (req, res, next) => {
        Event.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response)) //status
        .catch((err) => console.log("BBDD error", err));
});


module.exports = router;