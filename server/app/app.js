require('dotenv').config();
const cors = require('cors');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const ChattyDB = require('../config/db');

let resolvers = require('../graphql/resolvers');
let typeDefs = require('../graphql/schemas');

// routers
let confirmation = require("../routes/confirmation");
let refresh_token = require("../routes/refresh_token");

// middleware
const jwtAuth = require('../middlewares/jwt.auth');

const port = process.env.PORT || 4000;
const localhost = '127.0.0.1';
const app = express();

app.disable("x-powered-by");
app.use(cors(), helmet(), cookieParser(), compression());
app.use('/confirmation', confirmation)
app.use('/refresh_token', refresh_token)
app.use(jwtAuth)

const server = new ApolloServer({ 
    playground: process.env.NODE_ENV === 'development',
    typeDefs, 
    resolvers,
    debug: false,
    formatError: (e) => { return { message: e.originalError.message, code: e.originalError.extensions.code }},
    context: ({req, res}) => ({req, res})
});
server.applyMiddleware({app});

const main = async () => {
    app.listen(port);
    await ChattyDB.connectToDB();
    return `🚀  http://${localhost}:${port}${server.graphqlPath}\n💽  ChattyDB is connected\n`
}


main().then(console.log)