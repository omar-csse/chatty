const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express')


module.exports = jwtAuth = ({req, res}) => {

    const authorization = req.headers["authorization"];

    if (!authorization) throw new AuthenticationError("Not authenticated");
    
    const token = authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err) throw new AuthenticationError("Invalid token");;
        req.payload = payload;
    }); 

    req.loggedIn = true;
    return {req, res}
}