const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var resultSchema = new Schema({
    batch: {
        type: String,
        required: true 
    },
    semester: {
        type: Number,
        required: true
    },
    major: {
        type: Number,
        required: true,
        default: 0
    },
    minor: {
        type: Number,
        default: 0
    },
    attendence: {
        type: Number,
        default: 0
    },
    assignment: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

var Results = mongoose.model('Result', resultSchema);

module.exports = Results;