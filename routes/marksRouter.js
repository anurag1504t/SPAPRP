/**
 * File Name: marksRouter.js
 * This Express Router is for all the METHODS on Marks Document which stores marks of each student for all semester.
 */

 // Imported Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Marks = require('../models/marks');

const marksRouter = express.Router();
marksRouter.use(bodyParser.json());

// Methods for http://localhost:3000/marks/ API end point
marksRouter.route('/')
.get((req,res,next) => {
    Marks.find({})
    .then((marks) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(marks);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Marks.create(req.body)
    .then((mark) => {
        console.log(' Marks Entered In Database ', mark);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mark);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /marks');
})
.delete((req, res, next) => {
    Marks.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/marks/:userId API end point
marksRouter.route('/:userId')
.get((req,res,next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mark);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /marks/${req.params.userId}`);
})
.put((req, res, next) => {
    Marks.findOneAndUpdate({userId: req.params.userId}, {
        $set: req.body
    }, { new: true })
    .then((mark) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mark);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Marks.findOneAndDelete({userId: req.params.userId})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Methods for http://localhost:3000/marks/:userId/semesters API end point
marksRouter.route('/:userId/semesters')
.get((req,res,next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(mark.semesters);
        }
        else {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null) {
            mark.semesters.push(req.body);
            mark.save()
            .then((mark) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mark);                
            }, (err) => next(err));
        }
        else {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /users/${req.params.userId}/semesters`);
})
.delete((req, res, next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null) {
            for (var i = (mark.semesters.length -1); i >= 0; i--) {
                mark.semesters.id(mark.semesters[i]._id).remove();
            }
            mark.save()
            .then((mark) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mark);                
            }, (err) => next(err));
        }
        else {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/marks/:userId/semesters/:semesterId API end point
marksRouter.route('/:userId/semesters/:semesterId')
.get((req,res,next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null && mark.semesters.id(req.params.semesterId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(mark.semesters.id(req.params.semesterId));
        }
        else if (mark == null) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Semester ${req.params.semesterId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /users/${req.params.userId}/semesters/${req.params.semesterId}`);
})
.put((req, res, next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null && mark.semesters.id(req.params.semesterId) != null) {
            if (req.body.semester) {
                mark.semesters.id(req.params.semesterId).semester = req.body.semester;
            }
            if (req.body.subjects) {
                mark.semesters.id(req.params.semesterId).subjects = req.body.subjects;                
            }
            mark.save()
            .then((mark) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mark);                
            }, (err) => next(err));
        }
        else if (mark == null) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Semester ${req.params.semesterId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null && mark.semesters.id(req.params.semesterId) != null) {
            mark.semesters.id(req.params.semesterId).remove();
            mark.save()
            .then((mark) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mark);                
            }, (err) => next(err));
        }
        else if (mark == null) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Semester ${req.params.semesterId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Methods for http://localhost:3000/marks/:userId/semesters/:semesterId/subjects API end point
marksRouter.route('/:userId/semesters/:semesterId/subjects')
.get((req,res,next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null && mark.semesters.id(req.params.semesterId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(mark.semesters.id(req.params.semesterId).subjects);
        }
        else if (mark == null) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Semester ${req.params.semesterId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null && mark.semesters.id(req.params.semesterId) != null) {
            mark.semesters.id(req.params.semesterId).subjects.push(req.body);
            mark.save()
            .then((mark) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mark);                
            }, (err) => next(err));
        }
        else if(mark == null ) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Semester ${req.params.semesterId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /users/${req.params.userId}/semesters/${req.params.semesterId}/subjects`);
})
.delete((req, res, next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if (mark != null && mark.semesters.id(req.params.semesterId) != null) {
            for (var i = (mark.semesters.id(req.params.semesterId).subjects.length -1); i >= 0; i--) {
                mark.semesters.id(req.params.semesterId).subjects.id(mark.semesters.id(req.params.semesterId).subjects[i]._id).remove();
            }
            mark.save()
            .then((mark) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(mark);                
            }, (err) => next(err));
        }
        else if (mark == null) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Semester ${req.params.semesterId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Methods for http://localhost:3000/marks/:userId/semesters/:semesterId/subjects/:subjectId API end point
marksRouter.route('/:userId/semesters/:semesterId/subjects/:subjectId')
.get((req,res,next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if(mark != null) {
            if(mark.semesters.id(req.params.semesterId) != null) {
                if(mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId));
                }
                else {
                    err = new Error(`Subject ${req.params.subjectId} not found`);
                    err.status = 404;
                    return next(err);
                }
            }
            else {
                err = new Error(`Semester ${req.params.semesterId} not found`);
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /users/${req.params.userId}/semesters/${req.params.semesterId}/subjects/${req.params.subjectId}`);
})
.put((req, res, next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if(mark != null) {
            if(mark.semesters.id(req.params.semesterId) != null) {
                if(mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId) != null) {
                    if (req.body.subjectCode) {
                        mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId).subjectCode = req.body.subjectCode;
                    }
                    if (req.body.subjectName) {
                        mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId).subjectName = req.body.subjectName;
                    }
                    if (req.body.major) {
                        mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId).major = req.body.major;
                    }
                    if (req.body.minor) {
                        mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId).minor = req.body.minor;
                    }
                    if (req.body.attendence) {
                        mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId).attendence = req.body.attendence;
                    }
                    if (req.body.assignment) {
                        mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId).assignment = req.body.assignment;
                    }
                    mark.save()
                    .then((mark) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(mark);                
                    }, (err) => next(err));
                }
                else {
                    err = new Error(`Subject ${req.params.subjectId} not found`);
                    err.status = 404;
                    return next(err);
                }
            }
            else {
                err = new Error(`Semester ${req.params.semesterId} not found`);
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Marks.findOne({userId: req.params.userId})
    .then((mark) => {
        if(mark != null) {
            if(mark.semesters.id(req.params.semesterId) != null) {
                if(mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId) != null) {
                    mark.semesters.id(req.params.semesterId).subjects.id(req.params.subjectId).remove();
                    mark.save()
                    .then((mark) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(mark);                
                    }, (err) => next(err));
                }
                else {
                    err = new Error(`Subject ${req.params.subjectId} not found`);
                    err.status = 404;
                    return next(err);
                }
            }
            else {
                err = new Error(`Semester ${req.params.semesterId} not found`);
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = marksRouter;