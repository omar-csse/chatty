const jwt = require('jsonwebtoken');

const createAccessToken = (username) => {
    return jwt.sign({ username: username }, process.env.SECRET, { expiresIn: "1h"});
};

const createRefreshToken = (username) => {
    return jwt.sign({ username: username },process.env.REFRESH_SECRET, { expiresIn: "7d"});
};

module.exports = {
    createAccessToken,
    createRefreshToken
}