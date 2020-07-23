const express = require("express")
const router = express.Router()

const Message = require("../models/Messages.model")


//CREAR MENSAJE
//checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),
router.post('/',(req, res) => {
    Message
        .create(req.body)
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//VER MENSAJES
//checkRole(['DIRECTOR', 'TEACHER', 'PARENT']),
router.get("/", (req, res, next) => {
    Message
        .find()
        .populate('sendedBy')
        .populate('receivedBy')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//VER UN MENSAJE
//checkRole(['DIRECTOR', 'TEACHER', 'PARENT']), 
router.get('/:id', (req, res) => {
    Message
        .findById(req.params.id)
        .populate('sendedBy')
        .populate('receivedBy')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//BORRAR MENSAJE
//checkRole(['DIRECTOR', 'TEACHER', 'PARENT']), 
router.delete("/:id",(req, res, next) => {
    Message.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response))
        .catch((err) => next(err))
})


module.exports = router