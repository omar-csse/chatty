const jwt = require('jsonwebtoken');


const createToken = (payload, secret, duration) => {
    return jwt.sign(payload, secret, { expiresIn: duration});
};

const setCookie = (res, cookieName, token, path) => {
    res.cookie(cookieName, token, {secure: false, httpOnly: true, path: path, SameSite: "None"});
    return token;
}

const clearCookie = (res, cookiename, path) => {
    res.clearCookie(cookiename, path, {path: path})
}


module.exports = {
    createToken,
    setCookie,
    clearCookie
}