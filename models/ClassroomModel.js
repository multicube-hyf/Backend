const {Schema, model} = require('mongoose');

const classroomSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    students_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    teachers_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

module.exports = model('Classroom', classroomSchema);