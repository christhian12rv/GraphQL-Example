const db = require('../../../db');

module.exports = {
    User: {
        profile(user) {
            return db.profiles.find(p => p.id == user.profile);
        }
    },
    Query: {
        user(obj, args) {
            return db.users.find(u => u.id == args.id);
        },
        users() {
            return db.users;
        }
    }
}