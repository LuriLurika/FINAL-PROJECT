const express = require("express");
const router = express.Router();

const Message = require("../models/messages.model");
// const User = require("../models/User.model");

// const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
//     message: "Area Restringida!"
// })


//Crear mensaje ( todos menos el Student puede crear un msj) checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),
router.post('/',(req, res) => {
    //title, body, sendedBy, receivedBy
    Message
        .create(req.body)
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//Recuperar todos los mensajes ( todos menos el Student puede ver sus msjs)checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),
router.get("/", (req, res, next) => {
    Message
        .find()
        .populate('sendedBy')
        .populate('receivedBy')
        .then((response) => res.json(response))
        .catch((err) => next(err))
});


//Recuperar un mensaje( todos menos el Student puede ver su msj)checkRole(['DIRECTOR', 'TEACHER', 'PARENT']), 
router.get('/:id', (req, res) => {
    Message
        .findById(req.params.id)
        .populate('sendedBy')
        .populate('receivedBy')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})


//Borrar mensaje ????? relación con tabla ( todos menos el Student puede borrar su msj) checkRole(['DIRECTOR', 'TEACHER', 'PARENT']), 
router.delete("/:id",(req, res, next) => {
    Message.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response)) //ver cómo sacar mensaje de status
        .catch((err) => next(err))
});


module.exports = router;