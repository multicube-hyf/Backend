const {Schema, model} = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

module.exports = model('User', userSchema);