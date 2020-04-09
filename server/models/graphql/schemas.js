const path = require('path');
const mergeGraphqlSchemas = require('merge-graphql-schemas');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
 
const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));
module.exports = mergeTypes(typesArray, { all: true });