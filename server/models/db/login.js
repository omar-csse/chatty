const ChattyDB = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validated = require('./validation');
const { UserInputError, AuthenticationError } = require('apollo-server-express')
const { createToken, setRefreshToken } = require('../../config/tokens')


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

    const token = createToken(user.username, process.env.SECRET, "1h");
    const refresh_token = createToken(user.username, process.env.REFRESH_SECRET, "7d")
    setRefreshToken(res, refresh_token, "/refresh_token")
    
    return {token: token};
}