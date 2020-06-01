const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: ''
    },
    techStack: [String],
    contributers:[String],
    comments:[commentSchema]
}, {
    timestamps: true
});

var Projects = mongoose.model('Project', projectSchema);

module.exports = Projects;