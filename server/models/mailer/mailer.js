const nodemailer = require("nodemailer");

module.exports = transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
    },
});