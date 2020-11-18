const {Schema, model} = require('mongoose');

const studentSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dad_name: {
        type: String
    },
    dad_lastName: {
        type: String
    },
    mom_name: {
        type: String
    },
    mom_lastName: {
        type: String
    }
});

studentSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Student', studentSchema);