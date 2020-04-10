const login = require('../../db/login.js');
const signup = require('../../db/signup.js');
const getUser = require('../../db/getUser.js');

module.exports = resolvers = {
    Query: {
        user: async (_, {username}, {req, res}) => {
            if (!req.loggedIn) throw new Error('Not Logged In');
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