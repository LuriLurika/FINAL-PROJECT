module.exports = app => {

    // Base URLS
  
    app.use("/api", require("./auth.routes"))
    app.use("/api/courses", require("./courses.routes"))
    app.use("/api/users", require("./users.routes"))
    app.use("/api/teachers", require("./teachers.routes"))
<<<<<<< HEAD
    app.use("/api/subjects",  require("./subjects.routes")) //Solo tiene acceso el Director checkRole(['DIRECTOR']),
=======
    app.use("/api/subjects", require("./subjects.routes")) //checkRole(['DIRECTOR']),
>>>>>>> e2f4558b39a2c91f688a96e4513547e913e2082e
    app.use("/api/messages", require("./message.routes"))
    app.use("/api/events", require("./event.routes"))




}