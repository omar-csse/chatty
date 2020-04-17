const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ChattyDB = require('../config/db');
const { createToken, setRefreshToken } = require('../config/tokens')


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

    if (user.tokenVersion !== payload.version) {
      return res.send({ ok: false, accessToken: "" });
    }

    const refresh_token = createToken(user.username, process.env.REFRESH_SECRET, "7d")
    setRefreshToken(res, refresh_token)
    return res.send({ ok: true, accessToken: createToken(user.username, process.env.SECRET, "1h") });  
});


module.exports = router