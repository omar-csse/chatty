const ChattyDB = require('../../config/db');
const { ApolloError } = require('apollo-server-express')

module.exports = getUser = async (username) => {

    const usersDB = await ChattyDB.db.collection('users');
    const user = await usersDB.findOne({username: username});

    if (!user) throw new ApolloError('User not found', 'UNFOUND_USER');
    
    return user;
}