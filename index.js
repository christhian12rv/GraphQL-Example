const { gql, ApolloServer } = require('apollo-server');

const products = [
    {
        id: 1,
        name: 'Notebook',
        value: 7599.99
    },
    {
        id: 2,
        name: 'TV',
        value: 6000
    }
]

const users = [
    {
        id: 1,
        name: 'João',
        age: 28,
        salary: 13923.22,
        active: true
    },
    {
        id: 2,
        name: 'Maria',
        age: 22,
        salary: 8230,
        active: true
    }
]

const typeDefs = gql`
    type Product {
        id: ID
        name: String
        value: Float
    }

    type User {
        id: ID
        name: String
        age: Int
        salary: Float
        active: Boolean
    }

    type Query {
        users: [User]!
        products: [Product]!
        user(id: Int, name: String): User
    }
`;

const resolvers = {
    Query: {
        products() {
            return products;
        },
        users() {
            return users;
        },
        user(obj, args) {
            const { id, name } = args;
            if (!!id)
                return users.find(u => u.id === id);
            return users.find(u => u.name === name);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen();