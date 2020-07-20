module.exports = app => {

    // Base URLS
    
    app.use("/api", require("./auth.routes"));
}