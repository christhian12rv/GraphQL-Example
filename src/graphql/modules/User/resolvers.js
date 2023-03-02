const db = require('../../../db');

function generateId(list) {
    const lastItem = list[list.length - 1];

    if (!!lastItem)
        return lastItem.id + 1;

    return 1;
}

module.exports = {
    User: {
        profile(user) {
            return db.profiles.find(p => p.id == user.profile);
        }
    },
    Query: {
        user(obj, { filter: { id, email }, }) {
            const field = !!id ? id : email;
            const fieldName = !!id ? 'id' : 'email';

            return db.users.find(u => u[fieldName] == field);
        },
        users() {
            return db.users;
        }
    },
    Mutation: {
        createUser(obj, { data, }) {
            const { email, } = data;
            
            const userExists = db.users.some(u => u.email === email);

            if (!!userExists)
                throw new Error(`There is already a user with email ${email}`);

            const newUser = {
                ...data,
                id: generateId(db.users),
                profile: 2,
            };

            db.users.push(newUser);
            return newUser;
        },

        updateUser(obj, { id, data, }) {
            const user = db.users.find(u => u.id === id);

            if (!user)
                throw new Error(`User with id ${id} not exists`);

            const userIndex = db.users.findIndex(u => u.id === id);

            const newUser = {
                ...user,
                ...data,
            };

            db.users[userIndex] = newUser;

            return newUser;
        },
        deleteUser(obj, { filter: { id, email }, }) {
            const field = !!id ? id : email;
            const fieldName = !!id ? 'id' : 'email';

            const userFound = db.users.find(u => u[fieldName] === field);

            if (!userFound)
                return false;

            db.users = db.users.filter(u => u[fieldName] !== field);

            return true;
        },
    }
}