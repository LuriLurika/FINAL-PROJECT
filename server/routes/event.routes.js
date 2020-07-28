const express = require("express")
const router = express.Router()

const Event = require("../models/Event.model")
const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({
    message: "Area Restringida!"
})

//CREATE


router.post('/', checkRole(['DIRECTOR', 'TEACHER']),(req, res, next) => {

    const { title, description, participants, eventDate, eventTime, placeId, placeDescription } = req.body
    
    Event
        .create({title, description, participants, eventDate, eventTime, placeId, placeDescription})
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//ALL 

router.get("/", (req, res, next) => {
    Event
        .find()
        .populate('creator')
        .populate('participants')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//ONE EVENT
router.get('/:id',(req, res) => {
    Event
        .findById(req.params.id)
        .populate('creator')
        .populate('participants')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//UPDATE
router.put("/:id", checkRole(['DIRECTOR', 'TEACHER']), (req, res, next) => {
    Event
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) => res.json(response), req.body)
        .catch((err) => next(err))
})

//DELETE
router.delete("/:id", checkRole(['DIRECTOR', 'TEACHER']), (req, res, next) => {
        Event.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

module.exports = router