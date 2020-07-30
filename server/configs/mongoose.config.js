const mongoose = require('mongoose')

mongoose
    // .connect(`mongodb://localhost/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })

    .connect('mongodb+srv://EFdez:1234@cluster0.umhf5.mongodb.net/SchoolHack', { useNewUrlParser: true, useUnifiedTopology: true })


    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose