module.exports = app => {

    // const checkRole = rolesToCheck => (req, res, next) => rolesToCheck.includes(req.user.type) ? next() : res.json({message: "Area Restringida!"})

    // Base URLS

    app.use("/api", require("./auth.routes"))
    app.use("/api/courses", require("./courses.routes"))
    app.use("/api/users", require("./users.routes"))
    app.use("/api/teachers", require("./teachers.routes"))
    app.use("/api/subjects", require("./subjects.routes"))
    app.use("/api/messages", require("./message.routes"))
    app.use("/api/events", require("./event.routes"))

    app.use((req, res) => {
        res.sendFile(__dirname + "/public/index.html");
    })


}