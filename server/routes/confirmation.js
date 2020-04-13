const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ChattyDB = require('../config/db');


router.get('/:token', async (req, res) => {
    try {
        const usersDB = await ChattyDB.db.collection('users');
        const { username } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        await usersDB.updateOne({username: username}, {$set: { confirmedEmail : true}});
    } catch (e) {
        res.send('error');
    }
  
    return res.redirect('https://chatty.omar.app');
});

module.exports = router