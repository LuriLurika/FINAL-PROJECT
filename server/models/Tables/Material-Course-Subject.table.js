const mongoose = require("mongoose")
const Schema = mongoose.Schema

const materialCourseSubjectSchema = new Schema(
  {
    teacher: {
      type: mongoose.ObjectId,
      ref: "User", //user type teacher
    },

    course: {
      type: mongoose.ObjectId,
      ref: "Course",
    },

    subject: {
      type: mongoose.ObjectId,
      ref: "Subject",
    },

    material: {
      type: String,
      required: true
    },
    
  },{
    timestamps: true,
  }
)

const MaterialCourseSubjects = mongoose.model("MaterialCourseSubjects", materialCourseSubjectSchema)

module.exports = MaterialCourseSubjects;
