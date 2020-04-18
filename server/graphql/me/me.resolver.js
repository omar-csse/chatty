const login = require('../../db/login.js');
const logout = require('../../db/logout.js');
const signup = require('../../db/signup.js');
const reset_password = require('../../db/reset_password.js');
const { AuthenticationError } = require('apollo-server-express')


module.exports = resolvers = {
    Query: {
        login: async (_, {identifier, password}, {req, res}) => {
			return await login(identifier, password, res);
        },
        logout: (_, __, {req, res}) => {
            return logout(res)
        },
        forget_password: (_, {email}, context) => {
            return false
        }
    },
    Mutation: {
        signup: async (_, {username, email, password}) => {
			return await signup(username, email, password);
        },
        reset_password: async (_, {email, oldPass, newPass}, {req, res}) => {
            if (!req.loggedIn) throw new AuthenticationError('Not Authenticated');
            return await reset_password(email, req.username, oldPass, newPass)
        }
    }
}