const mongoose = require("mongoose")
const Schema = mongoose.Schema

const coursesSchema = new Schema({

    title: {
        type: String,
        enum: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'],
        required: true
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





