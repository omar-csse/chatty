const ChattyDB = require('../config/db');
const bcrypt = require('bcryptjs');
const validated = require('./validation');
const { UserInputError, AuthenticationError } = require('apollo-server-express')
const { createToken, setCookie, days } = require('../config/tokens')


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

    const refresh_token = createToken({username: user.username, version:user.tokenVersion}, process.env.REFRESH_SECRET, "365d")
    const token = createToken({username: user.username}, process.env.SECRET, `${days(4*365)}`)
    setCookie(res, "_sesjidrt", refresh_token, "/", days(365))
    setCookie(res, "__sesjidt_", token, "/", days(4*365))
    return {username: user.username, token: token, refToken: refresh_token};
}