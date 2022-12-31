const { gql, ApolloServer } = require('apollo-server');

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello() {
            return 'World';
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen();