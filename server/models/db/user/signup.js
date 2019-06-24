const ChattyDB = require('../../../config/db');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const validated = require('./validation');

module.exports = signup = async (username, email, password) => {
    value = validated(username, email, password, 'signup');
    if (value === true) return await signupDB(username, email, password)
    else throw new Error(value)
}

const signupDB = async (username, email, password) => {
    const usersDB = await ChattyDB.db.collection('users');
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await usersDB.findOne({$or: [{username}, {email}]})
    if (user) throw user.email === email ? new Error('email exist') : new Error('username exist');
    else {
        await usersDB.insertOne({username, email, password: hashedPassword, createdAt: moment().format('llll')}); 
    }
    return 'signed up successfully';
}