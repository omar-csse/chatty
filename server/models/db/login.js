const ChattyDB = require('../../config/db');
const bcrypt = require('bcryptjs');
const validated = require('./validation');
const { UserInputError, AuthenticationError } = require('apollo-server-express')
const { createToken, setCookie } = require('../../config/tokens')


module.exports = login = async (identifier, password, res) => {

    value = validated(identifier, identifier, password, 'login');

    if (value === true) return await loginDB(identifier, password, res)
    else throw new UserInputError(value)
}

const loginDB = async (identifier, password, res) => {

    const usersDB = await ChattyDB.db.collection('users');
    const user = await usersDB.findOne({$or: [{username: identifier}, {email: identifier}]})

    if (!user) throw new AuthenticationError('invlid username or email');
    else {
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new AuthenticationError('invalid password');
    }

    setCookie(res, "_sesjidrt", createToken({username: user.username, version:user.tokenVersion}, process.env.REFRESH_SECRET, "30d"))
    setCookie(res, "__sesjidt_", createToken({username: user.username}, process.env.SECRET, "1h"))
    return {username: user.username};
}