const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ChattyDB = require('../config/db');
const { createToken, setCookie, days } = require('../config/tokens')


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

    if (!user || user.tokenVersion !== payload.version) {
      return res.send({ ok: false });
    }

    const refresh_token = createToken({username: user.username, version:user.tokenVersion}, process.env.REFRESH_SECRET, "365d")
    setCookie(res, "_sesjidrt", refresh_token, "/", days(365))
    setCookie(res, "__sesjidt_", createToken({username: user.username}, process.env.SECRET, `${days(4*365)}`), "/", days(4*365))
    return res.send({ ok: true });  
});


module.exports = router