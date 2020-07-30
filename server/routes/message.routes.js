const express = require("express");
const router = express.Router();

const Message = require("../models/Messages.model");
const User = require("../models/User.model");

const mailer = require("../configs/nodemailer.config");

//CREATE

router.post("/", (req, res, next) => {
  const { title, body, receivedBy, parentMessage } = req.body;
  User.findById(receivedBy)
    .then((user) => {
      console.log(req.user);
      Message.create({
        title,
        body,
        receivedBy, //el id para guardarlo en el modelo
        sendedBy: req.user._id,
        parentMessage
      })
        .then((response) => {
          mailer
            .sendMail({
              from: '"Lel School" <info.lelschool@gmail.com>',
              to: user.email,
              subject: title,
              text: body,
              html: `<b>${body}</b>`,
            })
            .then(() => res.json(response))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

//FETCH MESSAGES

router.get("/", (req, res, next) => {
  Message.find()
    .populate("sendedBy")
      .populate("receivedBy")
      .populate("parentMessage")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});
//FETCH SEND

router.get("/:id/send", (req, res, next) => {
  Message.find({ sendedBy: req.params.id })
    .populate("sendedBy")
    .populate("receivedBy")
    .populate("parentMessage")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//FETCH RECEIVED
router.get("/:id/received", (req, res, next) => {
  Message.find({ receivedBy: req.params.id })
    .populate("sendedBy")
    .populate("receivedBy")
    .populate("parentMessage")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//FETCH ONE MESSAGE

router.get("/:id/", (req, res, next) => {
  Message.findById(req.params.id)
    .populate("sendedBy")
    .populate("receivedBy")
    .populate("parentMessage")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

// UPDATE READED
router.put("/:id/read", (req, res, next) => {
  Message.findOneAndUpdate(
    { _id: req.params.id },
    {
      readed: true,
    },
    {
      new: true,
    }
  )
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

//DELETE

router.delete("/:id", (req, res, next) => {
  Message.findByIdAndRemove(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

module.exports = router;
