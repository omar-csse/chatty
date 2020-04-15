const ChattyDB = require('../../config/db');
const { UserInputError } = require('apollo-server-express')

module.exports = getUser = async (username) => {

    const usersDB = await ChattyDB.db.collection('users');
    const user = await usersDB.findOne({username: username});

    if (!user) throw new UserInputError('User not found');
    
    return user;
}