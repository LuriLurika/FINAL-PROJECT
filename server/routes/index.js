module.exports = app => {

    // Base URLS
  
    app.use("/api", require("./auth.routes"))
    app.use("/api/courses", require("./courses.routes"))
    app.use("/api/users", require("./users.routes"))
    app.use("/api/teachers", require("./teachers.routes"))
    app.use("/api/subjects", require("./subjects.routes")) //checkRole(['DIRECTOR']),
    app.use("/api/messages", require("./message.routes"))
    app.use("/api/events", require("./event.routes"))




}