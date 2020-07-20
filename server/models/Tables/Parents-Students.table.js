const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentsStudentsSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ParentStudents = mongoose.model("ParentStudents", parentsStudentsSchema);

module.exports = ParentStudents
