const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectsSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    subjectsMaterials: {
      type: mongoose.ObjectId,
      ref: "MaterialCourseSubjects",
    },
  },
  {
    timestamps: true,
  }
);
const Subject = mongoose.model("Subject", subjectsSchema)

module.exports = Subject;
