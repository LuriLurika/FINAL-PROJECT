const express = require("express")
const router = express.Router()

const Message = require("../models/Messages.model")
const User = require("../models/User.model")



//CREATE

router.post('/', (req, res) => {
    
    const { title, body, receivedBy } = req.body

    // User.find({ email: receivedBy })
    
        // .then(() => {
            Message.create({title, body, receivedBy, sendedBy: req.user.id})
    // } )
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//FETCH MESSAGES

router.get("/", (req, res, next) => {


    Message
        .find()
        .populate('sendedBy')
        .populate('receivedBy')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//FETCH ONE MESSAGE

router.get('/:id', (req, res) => {
    Message
        .findById(req.params.id)
        .populate('sendedBy')
        .populate('receivedBy')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//DELETE

router.delete("/:id",(req, res, next) => {
    Message.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response))
        .catch((err) => next(err))
})


module.exports = router