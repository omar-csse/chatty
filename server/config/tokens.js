const jwt = require('jsonwebtoken');


const createToken = (username, secret, duration) => {
    return jwt.sign({ username: username }, secret, { expiresIn: duration});
};

const setRefreshToken = (res, token, path) => {
    res.cookie("_sesjwtid", token, {secure: false, httpOnly: true, path: path});
}


module.exports = {
    createToken,
    setRefreshToken,
}