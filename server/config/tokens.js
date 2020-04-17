const jwt = require('jsonwebtoken');


const createToken = (payload, secret, duration) => {
    return jwt.sign(payload, secret, { expiresIn: duration});
};

const setRefreshToken = (res, token) => {
    res.cookie("_sesjid", token, {secure: false, httpOnly: true, path: "/"});
}

const clearCookie = (res, cookiename, path) => {
    res.clearCookie(cookiename, path, {path: path})
}


module.exports = {
    createToken,
    setRefreshToken,
    clearCookie
}