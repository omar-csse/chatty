const jwt = require('jsonwebtoken');

module.exports = sendConfirmEmail = (username, email, transporter) => {

    jwt.sign({username: username}, process.env.EMAIL_SECRET, {expiresIn: '30d',}, (err, emailToken) => {

            const url = `http://localhost:4000/confirmation/${emailToken}`;

            transporter.sendMail({
                to: email,
                subject: "noreply.chatty - confirm email",
                html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
            });
        },
    );
}