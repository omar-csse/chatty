require('dotenv').config();
const os = require('os');
const cluster = require('cluster');
const cors = require('cors');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLError } = require('graphql');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const jwtAuth = require('../middlewares/jwt.auth');
const ChattyDB = require('../config/db');

let resolvers = require('../models/graphql/resolvers');
let typeDefs = require('../models/graphql/schemas');

// middlewares
let confirmationRouter = require("../routes/confirmation");

const port = process.env.PORT || 4000;
const localhost = '127.0.0.1';
const app = express();

app.use(cors(), helmet(), cookieParser(), compression(), jwtAuth);
app.use('/confirmation', confirmationRouter)

const server = new ApolloServer({ 
    playground: process.env.NODE_ENV === 'development',
    typeDefs, 
    resolvers, 
    formatError: (e) => new GraphQLError(e.message),
    context: ({req, res}) => ({req, res})
});
server.applyMiddleware({app});

const main = async () => {
    app.listen(port);
    await ChattyDB.connectToDB();
    return `🚀  http://${localhost}:${port}${server.graphqlPath}\n💽  ChattyDB is connected\n`
}

// if (cluster.isMaster) {
//     for (let i = 0 ; i < os.cpus().length ; i++) cluster.fork();
//     cluster.on('exit', () => cluster.fork());
// }
// else 
main().then(console.log);