const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var subjectSchema = new Schema({
    subjectCode: {
        type: String,
        required: true
    },
    major: {
        type: Number,
        required: true,
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

var marksSchema = new Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    batch: {
        type: String,
        required: true 
    },
    semester: {
        type: Number,
        required: true
    },
    subject: [subjectSchema]    
}, {
    timestamps: true
});

var Marks = mongoose.model('Mark', marksSchema);

module.exports = Marks;