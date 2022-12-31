const { gql, ApolloServer } = require('apollo-server');

const users = [
    {
        id: 1,
        name: 'João',
        email: 'joão@email.com',
        phone_fixed: '11 1234 1234',
        profile: 1
    },
    {
        id: 1,
        name: 'Maria',
        email: 'maria@email.com',
        phone_fixed: '11 4342 4321',
        profile: 2
    }
];

const profiles = [
    {
        id: 1,
        description: 'ADMIN'
    },
    {
        id: 2,
        description: 'NORMAL'
    }
];

const typeDefs = gql`

    type User {
        id: ID
        name: String
        email: String
        phone: String
        profile: Profile
    }

    type Profile {
        id: ID
        description: String
    }

    type Query {
        user(id: ID): User
        profiles: [Profile]
    }
`;

const resolvers = {
    User: {
        phone(user) {
            return user.phone_fixed;
        },
        profile(user) {
            return profiles.find(p => p.id === user.profile);
        }
    },
    Query: {
        user(obj, args) {
            return users.find(u => u.id === args.id);
        },
        profiles() {
            return profiles;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen();