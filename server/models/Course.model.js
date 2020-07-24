const mongoose = require("mongoose")
const Schema = mongoose.Schema

const coursesSchema = new Schema({

    title: {
        type: String,
        enum: ['1º de primaria', '2º de primaria', '3º de primaria', '4º de primaria', '5º de primaria', '6º de primaria'],
        required: true,
    },

    subjects: [{ 
        type: mongoose.ObjectId,
        ref: "Subject"
    }],

    users: [{ 
        type: mongoose.ObjectId,
        ref: "User"
    }]
    
}, {
    timestamps: true
})

const Course = mongoose.model("Course", coursesSchema)
module.exports = Course





