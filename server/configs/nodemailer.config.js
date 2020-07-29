const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'info.lelschool@gmail.com',
        pass: 'Popino.1234'
    }
})

module.exports = transporter