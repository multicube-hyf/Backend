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

classroomSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Classroom', classroomSchema);