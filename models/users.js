const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SGPASchema = new Schema({
    semester: {
        type: Number,
        required: true
    },
    gradePoint: {
        type: Number,
        required: true
    } 
}, {
    timestamps: true
})

var userSchema = new Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true 
    },
    batch: {
        type: String,
        required: true 
    },
    CGPA: {
        type: Number,
        default: 0
    },
    SGPA: [SGPASchema]
}, {
    timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;