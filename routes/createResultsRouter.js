// Imported Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Users = require('../models/users');
const Marks = require('../models/marks');

const createResultsRouter = express.Router();
createResultsRouter.use(bodyParser.json());

// Methods for http://localhost:3000/createResults/ API end point
createResultsRouter.route('/')
.post((req, res, next) => {
    Marks.find({batch: req.body.batch})
    .then((students) => {
        // console.log(students);
        for (var i = (students.length -1); i >= 0; i--) {
            for(var j = students[i].semesters.length - 1; i >= 0; i--) {
                if(students[i].semesters[j].semester == req.body.semester) { 
                    var SG = 0;
                    for(var k = students[i].semesters[j].subjects.length -1; k >= 0; k--) {
                        var subjectMarks = students[i].semesters[j].subjects[k].major*req.body.major + students[i].semesters[j].subjects[k].minor*req.body.minor + students[i].semesters[j].subjects[k].attendence*req.body.attendence +students[i].semesters[j].subjects[k].assignment*req.body.assignment;
                        var totalMarks = 50*req.body.major + 40*req.body.minor + 5*req.body.attendence + 5*req.body.assignment;
                        SG = SG + (subjectMarks/totalMarks)*10;
                    }
                    var SG = SG/students[i].semesters[j].subjects.length; 
                    Users.findOne({userId: students[i].userId})
                    .then((user) => {
                        if (user != null) {
                            var temp = 0;
                            for( var l = user.SGPA.length - 1; l >= 0; l--)
                            {
                                console.log(user.SGPA[l].gradePoint);                                
                                temp += user.SGPA[l].gradePoint;
                            }
                            user.SGPA.push({semester : req.body.semester, gradePoint : SG});
                            user.CGPA = (temp + SG)/(user.SGPA.length + 1);
                            user.save()
                            .then((user) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(user);                
                            }, (err) => next(err))
                            .catch((err) => next(err));
                        }
                        else {
                            err = new Error(`User ${req.params.userId} not found`);
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err))
                    .catch((err) => next(err));
                }
                else {
                    err = new Error(`User ${req.params.userId} not found`);
                    err.status = 404;
                    return next(err);
                }
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.all((req, res, next) => {
    res.statusCode = 403;
    res.end(`${req.method} operation not supported on /createResults/`);    
});

module.exports = createResultsRouter;