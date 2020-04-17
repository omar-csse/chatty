const jwt = require('jsonwebtoken');


module.exports = jwtAuth = (req, res, next) => {

    const token = req.cookies.__sesjidt_;

    if (!token) return next();
    
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err) return next();
        req.username = payload.username;
    }); 

    req.loggedIn = true;
    return next()
}