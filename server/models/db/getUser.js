const ChattyDB = require('../../config/db');

module.exports = getUser = async (username) => {

    const usersDB = await ChattyDB.db.collection('users');
    const user = await usersDB.findOne({username: username});

    if (!user) throw new Error('User not found');
    
    return user;
}