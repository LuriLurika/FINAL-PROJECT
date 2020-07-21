const express = require("express");
const router = express.Router();

const Event = require("../models/Event.model");
const User = require("../models/User.model");



//Crear evento

router.post('/', (req, res) => {
    //title, description, creator, participants, eventDate
    Event
        .create(req.body)
        .then((response) => res.json(response))
        .catch(err => console.log("Error en la BBDD", err))
})

//Recuperar todos los eventos
router.get("/", (req, res, next) => {
    Event
        .find()
        .populate(User)
        .then((response) => res.json(response))
        .catch((err) => next(err));
});


//Recuperar un evento
router.get('/:id', (req, res) => {
    Event
        .findById(req.params.id)
        .populate(User)
        .then((response) => res.json(response))
        .catch(err => console.log("Error en la BBDD", err))
})

//Editar evento
router.put("/:id", (req, res, next) => {
    Event
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) => res.json(response), req.body)
        .catch((err) => next(err));
});


//Borrar evento
router.delete("/:id", (req, res, next) => {
        Event.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response)) //status
        .catch((err) => console.log("BBDD error", err));
});


module.exports = router;