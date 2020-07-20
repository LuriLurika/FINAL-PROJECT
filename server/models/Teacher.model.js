const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    lastname: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },

    profileImg: {
      type: String,
      default:
        "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595237957/School%20Hack/perfil_yjma5d.jpg",
    },

    type: {
      type: String,
      enum: ["DIRECTOR", "TEACHER"],
    },

    subject: {
      type: mongoose.ObjectId,
      ref: "Subject",
    },

    users: {
      type: mongoose.ObjectId,
      ref: "User",
    },

    courses: {
      type: {
        type: mongoose.ObjectId,
        ref: "Course",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
