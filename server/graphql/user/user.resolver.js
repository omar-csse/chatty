const getUser = require('../../db/getUser.js');
const { AuthenticationError } = require('apollo-server-express')


module.exports = resolvers = {
    Query: {
        user: async (_, {username}, {req, res}) => {
            if (!req.loggedIn) throw new AuthenticationError('Not Logged In');
			return await getUser(username);
        }
    },
    Mutation: {
        follow_user: async (_, {username}, {req, res}) => {
            if (!req.loggedIn) throw new AuthenticationError('Not Authenticated');
			return true;
        },
        unfollow_user: async (_, {username}, {req, res}) => {
            if (!req.loggedIn) throw new AuthenticationError('Not Authenticated');
            return true;
        }
    }
}