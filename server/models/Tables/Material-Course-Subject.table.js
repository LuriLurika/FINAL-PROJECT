const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialCourseSubjectSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User",
    },

    teacher: {
      type: mongoose.ObjectId,
      ref: "Teacher",
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
    },
  },
  {
    timestamps: true,
  }
);

const MaterialCourseSubjects = mongoose.model("MaterialCourseSubjects", materialCourseSubjectSchema)

module.exports = MaterialCourseSubjects;
