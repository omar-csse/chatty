const jwt = require('jsonwebtoken');

module.exports = jwtAuth = async (req, res, next) => {

    const token = req.cookies._sesjwtid;

    if (!token) return next();
    
    await jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) return next();
        req.username = data.username;
    }); 

    req.loggedIn = true;

    return next();
}