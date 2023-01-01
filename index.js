const { gql, ApolloServer } = require('apollo-server');
const graphql = require('./src/graphql');

const server = new ApolloServer({
    ...graphql
});

server.listen().then(({ url }) => console.log(`Servidor rodando em ${url}`));