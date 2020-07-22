const express = require("express");
const router = express.Router();

const Message = require("../models/messages.model");
const User = require("../models/User.model");

const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
    message: "Area Restringida!"
})


//Crear mensaje ( todos menos el Student puede crear un msj)
router.post('/', checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),(req, res) => {
    //title, body, sendedBy, receivedBy
    Message
        .create(req.body)
        .then((response) => res.json(response))
        .catch(err => console.log("Error en la BBDD", err))
})

//Recuperar todos los mensajes ( todos menos el Student puede ver sus msjs)
router.get("/", checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),(req, res, next) => {
    Message
        .find()
        .populate(User)
        .then((response) => res.json(response))
        .catch((err) => next(err));
});


//Recuperar un mensaje( todos menos el Student puede ver su msj)
router.get('/:id', checkRole(['DIRECTOR', 'TEACHER', 'PARENT']), (req, res) => {
    Message
        .findById(req.params.id)
        .populate(User)
        .then((response) => res.json(response))
        .catch(err => console.log("Error en la BBDD", err))
})


//Borrar mensaje ????? relación con tabla ( todos menos el Student puede borrar su msj)
router.delete("/:id", checkRole(['DIRECTOR', 'TEACHER', 'PARENT']), (req, res, next) => {
    Message.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response)) //ver cómo sacar mensaje de status
        .catch((err) => console.log("BBDD error", err));
});


module.exports = router;