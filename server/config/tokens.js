const jwt = require('jsonwebtoken');


const days = (day) => day * 24 * 60 * 60 * 1000

const createToken = (payload, secret, duration) => {
    return jwt.sign(payload, secret, { expiresIn: duration});
};

const setCookie = (res, cookieName, token, path, days) => {
    res.cookie(cookieName, token, {secure: false, maxAge: days, httpOnly: true, path: path, SameSite: "None"});
    return token;
}

const clearCookie = (res, cookiename, path) => {
    res.clearCookie(cookiename, path, {path: path})
}


module.exports = {
    createToken,
    setCookie,
    clearCookie,
    days
}