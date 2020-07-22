const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
        "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595247178/School%20Hack/images_rtgo7j.jpg",
    },

    type: {
      type: String,
      enum: ["PARENT", "STUDENT", "DIRECTOR", "TEACHER"],
      default: "STUDENT",
    },

    parent: {
        type: mongoose.ObjectId,
        ref: "User", //user type Parent
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema)

module.exports = User
