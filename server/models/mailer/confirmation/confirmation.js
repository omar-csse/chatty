const jwt = require('jsonwebtoken');
const transporter = require('../mailer')
const ejs = require("ejs");


module.exports = sendConfirmEmail = (username, email) => {

    jwt.sign({username: username}, process.env.EMAIL_SECRET, {expiresIn: '30d',}, (err, emailToken) => {

        const url = `http://localhost:4000/confirmation/${emailToken}`;

        ejs.renderFile(__dirname + '/confirmation.ejs', {username: username, url: url}, async (err, data) => {
            if (err) console.log(err) 
            let info = await transporter.sendMail({
                to: email,
                subject: "noreply.chatty - confirm email",
                html: data,
            });
    
            console.log("Message sent: %s", info.messageId);
        })
    });
}