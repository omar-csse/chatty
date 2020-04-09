const ChattyDB = require('../../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validated = require('./validation');
const days = day =>  day * 24;

module.exports = login = async (identifier, password, res) => {

    value = validated(identifier, identifier, password, 'login');

    if (value === true) return await loginDB(identifier, password, res)
    else throw new Error(value)
}

const loginDB = async (identifier, password, res) => {

    const usersDB = await ChattyDB.db.collection('users');
    const user = await usersDB.findOne({$or: [{username: identifier}, {email: identifier}]})

    if (!user) throw new Error('invlid username or email');
    else {
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('invalid password');
    }

    const token = await jwt.sign({username: user.username}, process.env.SECRET, {expiresIn: `${days(7)}hr`});
    await res.cookie('_sesjwtid', token, {maxAge: 7 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true});
    
    return user;
}