const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type:String
        },

        creator: {
            type: mongoose.ObjectId,
            ref: "User" //user type teacher-director
        },

        participants: [{ //array
            type: mongoose.ObjectId,
            ref: "User"
        }],

        eventDate: {
            type: Date,
            default: Date.now
        },
    },

    {
        timestamps: true,
    }
)



const Event = mongoose.model("Event", eventSchema)

module.exports = Event