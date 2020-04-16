const jwt = require('jsonwebtoken');

const createAccessToken = (username) => {
    return jwt.sign({ username: username }, process.env.SECRET, { expiresIn: "15m"});
};

const createRefreshToken = (username) => {
    return jwt.sign({ username: username, tokenVersion: user.tokenVersion },process.env.REFRESH_SECRET, { expiresIn: "7d"});
};

module.exports = {
    createAccessToken,
    createRefreshToken
}