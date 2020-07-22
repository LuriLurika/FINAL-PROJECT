const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSubjectSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User", //user type student
    },
    teacher: {
      type: mongoose.ObjectId,
      ref: "User", //user type teacher
    },
    course: {
      type: mongoose.ObjectId,
      ref: "Course",
    },

    subject: [{
      type: mongoose.ObjectId,
      ref: "Subject",
    }],
  },

  {
    timestamps: true,
  }
);

const CourseSubjects = mongoose.model("CourseSubjects", courseSubjectSchema);

module.exports = CourseSubjects;
