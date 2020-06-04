/**
 * This schema is for the Marks Document which stores marks of each student for all semester.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var subjectSchema = new Schema({
    subjectCode: {
        type: String,
        unique: true,
        required: true
    },
    subjectName: {
        type: String,
        default: ''
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

var semesterSchema = new Schema({
    semester: {
        type: Number,
        required: true
    },
    subjects: [subjectSchema]    
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
    semesters: [semesterSchema]    
}, {
    timestamps: true
});

var Marks = mongoose.model('Mark', marksSchema);

module.exports = Marks;