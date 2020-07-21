const express = require("express");
const router = express.Router();

const Message = require("../models/Messages.model");
const User = require("../models/User.model");




//Crear mensaje
router.post('/', (req, res) => {
    //title, body, sendedBy, receivedBy
    Message
        .create(req.body)
        .then((response) => res.json(response))
        .catch(err => console.log("Error en la BBDD", err))
})

//Recuperar todos los mensajes
router.get("/", (req, res, next) => {
    Message
        .find()
        .populate(User)
        .then((response) => res.json(response))
        .catch((err) => next(err));
});


//Recuperar un mensaje
router.get('/:id', (req, res) => {
    Message
        .findById(req.params.id)
        .populate(User)
        .then((response) => res.json(response))
        .catch(err => console.log("Error en la BBDD", err))
})


//Borrar mensaje ????? relación con tabla
router.delete("/:id", (req, res, next) => {
    Message.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response)) //ver cómo sacar mensaje de status
        .catch((err) => console.log("BBDD error", err));
});


module.exports = router;