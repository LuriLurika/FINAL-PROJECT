const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userCourseSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User", //user type student
    },

    course: {
      type: mongoose.ObjectId,
      ref: "Course",
    },

  },{
    timestamps: true,
  }
)

const UserCourse = mongoose.model("UserCourse", userCourseSchema)

module.exports = UserCourse
