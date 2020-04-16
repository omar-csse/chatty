const login = require('../../models/db/login.js');
const signup = require('../../models/db/signup.js');
const getUser = require('../../models/db/getUser.js');
const jwtAuth = require('../../middlewares/jwt.auth');
const { AuthenticationError } = require('apollo-server-express')


module.exports = resolvers = {
    Query: {
        user: async (_, {username}, context) => {
            const {req, res} = jwtAuth(context)
            if (!req.loggedIn) throw new AuthenticationError('Not Logged In');
			return await getUser(username);
        },
        login: async (_, {identifier, password}, {req, res}) => {
			return await login(identifier, password, res);
        }
    },
    Mutation: {
        signup: async (_, {username, email, password}) => {
			return await signup(username, email, password);
        },
    }
}