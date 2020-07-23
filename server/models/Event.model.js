const mongoose = require("mongoose")
const Schema = mongoose.Schema

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            set: text => text.charAt(0).toUpperCase() + text.substring(1)
        },

        description: {
            type: String,
            required: true,
            maxlength: 100
        },

        creator: {
            type: mongoose.ObjectId,
            ref: "User" //user type teacher-director
        },

        participants: [{ 
            type: mongoose.ObjectId,
            ref: "User"
        }],

        eventDate: {
            type: Date,
            default: Date.now
        },
        
    },{
        timestamps: true,
    }
)

const Event = mongoose.model("Event", eventSchema)

module.exports = Event