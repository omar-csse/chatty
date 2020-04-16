const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ChattyDB = require('../config/db');
const { createRefreshToken, createAccessToken } = require('../config/tokens')


router.post('/', async (req, res) => {
    const token = req.cookies._sesjwtid;
    if (!token) {
        return res.send({ ok: false, accessToken: "" });
    }

    let payload = null;
    try {
        payload = jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (err) {
        return res.send({ ok: false, accessToken: "" });
    }

    const usersDB = await ChattyDB.db.collection('users');
    const user = await usersDB.findOne({ username: payload.username });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    // if (user.tokenVersion !== payload.tokenVersion) {
    //   return res.send({ ok: false, accessToken: "" });
    // }

    const refresh_token = createRefreshToken(user.username)
    res.cookie("_sesjwtid", refresh_token, {secure: false, httpOnly: true, path: "/refresh_token"});
    return res.send({ ok: true, accessToken: createAccessToken(user) });  
});


module.exports = router