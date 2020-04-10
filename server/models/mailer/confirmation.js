const jwt = require('jsonwebtoken');
const transporter = require('./mailer')


module.exports = sendConfirmEmail = (username, email) => {

    jwt.sign({username: username}, process.env.EMAIL_SECRET, {expiresIn: '30d',}, async (err, emailToken) => {

        const url = `http://localhost:4000/confirmation/${emailToken}`;

        let info = await transporter.sendMail({
            to: email,
            subject: "noreply.chatty - confirm email",
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        });

        console.log("Message sent: %s", info.messageId);
        },
    );
}