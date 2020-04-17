const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ChattyDB = require('../config/db');
const { createToken, setCookie } = require('../config/tokens')


router.post('/', async (req, res) => {
   
    const token = req.cookies._sesjidrt;
    if (!token) {
        return res.send({ ok: false });
    }

    let payload = null;
    try {
        payload = jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (err) {
        return res.send({ ok: false });
    }

    const usersDB = await ChattyDB.db.collection('users');
    const user = await usersDB.findOne({ username: payload.username });

    if (!user) {
      return res.send({ ok: false });
    }

    if (user.tokenVersion !== payload.version) {
      return res.send({ ok: false, accessToken: "" });
    }

    setCookie(res, "_sesjidrt", createToken({username: user.username, version:user.tokenVersion}, process.env.REFRESH_SECRET, "30d"))
    setCookie(res, "__sesjidt_", createToken({username: user.username}, process.env.SECRET, "1h"))
    return res.send({ ok: true });  
});


module.exports = router