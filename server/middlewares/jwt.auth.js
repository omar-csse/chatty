const jwt = require('jsonwebtoken');

module.exports = jwtAuth = async (req, res, next) => {

    const token = req.cookies._sesjwtid;

    if (!token) return next();
    
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err) return next();
        req.payload = payload;
    }); 

    req.loggedIn = true;

    return next();
}