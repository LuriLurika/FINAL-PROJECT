const mongoose = require("mongoose")
const Schema = mongoose.Schema


const messageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    sendedBy: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    parentMessage: {
      type: mongoose.ObjectId,
      ref: "Message",
    },
    receivedBy: [
      {
        //array
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],

    readed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema)

module.exports = Message