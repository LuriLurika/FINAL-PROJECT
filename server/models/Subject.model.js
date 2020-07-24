const mongoose = require("mongoose")
const Schema = mongoose.Schema

const subjectsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      set: text => text.charAt(0).toUpperCase() + text.substring(1)
    },

    teacher: {
      type: mongoose.ObjectId,
      ref: 'User' //user type teacher
    },

    subjectsMaterials: {
      type: mongoose.ObjectId,
      ref: "MaterialCourseSubjects",
    },
  },{
    timestamps: true,
  }
)
const Subject = mongoose.model("Subject", subjectsSchema)

module.exports = Subject
