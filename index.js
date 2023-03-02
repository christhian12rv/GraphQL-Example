const { ApolloServer } = require('apollo-server');
const graphql = require('./src/graphql');

const server = new ApolloServer({
    ...graphql,
    formatError: (err) => {
        return new Error(err.message);
    }
});

server.listen().then(({ url }) => console.log(`Servidor rodando em ${url}`));