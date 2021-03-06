const ChattyDB = require('../config/db');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const validated = require('./validation');
const sendConfirmEmail = require('../models/mailer/confirmation/confirmation')
const { UserInputError, ApolloError } = require('apollo-server-express')


module.exports = signup = async (username, email, password) => {

    value = validated(username, email, password, 'signup');

    if (value === true) return await signupDB(username, email, password)
    else throw new UserInputError(value)
}

const signupDB = async (username, email, password) => {

    const usersDB = await ChattyDB.db.collection('users');
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await usersDB.findOne({$or: [{username}, {email}]})

    if (user) throw new UserInputError(user.email === email ? 'email exist' : 'username exist');
    else {
        try {
            await usersDB.insertOne({username, email, confirmedEmail: false, password: hashedPassword, createdAt: moment().format('llll'), tokenVersion: 0});
            sendConfirmEmail(username, email)
    
            return true; 
        } catch(e) {
            console.log(e)
            throw new ApolloError('Internal server error')
        }
    }
}