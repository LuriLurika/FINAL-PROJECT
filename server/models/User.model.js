const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      set: text => text.charAt(0).toUpperCase() + text.substring(1)
    },

    lastname: {
      type: String,
      required: true,
      set: text => text.charAt(0).toUpperCase() + text.substring(1)
    },

    email: {
      type: String,
      validate: {
        validator: function (v) {
          return [/^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/]
        },
        message: 'Please enter a valid email'
      }
    },

    username: {
      type: String,
      required: true, 
      unique: true
    },

    password: {
      type: String,
      minlength: 4
    },

    profileImg: {
      type: String,
      default:
        "https://res.cloudinary.com/dz0aow7wm/image/upload/v1595247178/School%20Hack/images_rtgo7j.jpg",
    },

    type: {
      type: String,
      enum: ["STUDENT", "DIRECTOR", "TEACHER"],
      default: "STUDENT",
    },

    parent: {
      type: String,
      default: ""
    },

  }, {
  timestamps: true,
}
)

const User = mongoose.model("User", userSchema)

module.exports = User
