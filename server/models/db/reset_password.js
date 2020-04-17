const ChattyDB = require('../../config/db');
const bcrypt = require('bcryptjs');
const { passwordRegExp } = require('../regexp/regexp');
const { UserInputError, AuthenticationError } = require('apollo-server-express')


module.exports = reset_password = async (email, username, oldPass, newPass) => {

    if (oldPass === newPass) throw new UserInputError("New password has to be different")
    if (!passwordRegExp.test(newPass)) throw new UserInputError("Invalid new password")

    return await reset_passwordDB(email, username, oldPass, newPass)
}

const reset_passwordDB = async (email, username, oldPass, newPass) => {

    const usersDB = await ChattyDB.db.collection('users');
    const user = await usersDB.findOne({ $and: [ {email: email}, {username: username} ] })

    if (!user) throw new AuthenticationError('invlid username or email');
    else {
        const valid = await bcrypt.compare(oldPass, user.password);
        if (!valid) throw new AuthenticationError('invalid password');

        const hashedPassword = await bcrypt.hash(newPass, 10); 
        await usersDB.updateOne({email: email}, {$set: {password: hashedPassword}})
    }

    return true
}