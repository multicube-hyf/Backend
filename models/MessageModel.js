const {Schema, model} = require('mongoose');

const messageSchema = Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
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

module.exports = model('Message', messageSchema);