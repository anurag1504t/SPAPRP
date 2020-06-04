// Imported Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Users = require('../models/users');

const usersRouter = express.Router();
usersRouter.use(bodyParser.json());

// Methods for http://localhost:3000/users/ API end point
usersRouter.route('/')
.get((req,res,next) => {
    Users.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Users.create(req.body)
    .then((user) => {
        console.log('User Created ', user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users');
})
.delete((req, res, next) => {
    Users.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/users/:userId API end point
usersRouter.route('/:userId')
.get((req,res,next) => {
    Users.findOne({userId: req.params.userId})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /users/'+ req.params.userId);
})
.put((req, res, next) => {
    Users.findOneAndUpdate({userId: req.params.userId}, {
        $set: req.body
    }, { new: true })
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Users.findOneAndDelete({userId: req.params.userId})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Methods for http://localhost:3000/users/:userId/SGPA API end point
usersRouter.route('/:userId/SGPA')
.get((req,res,next) => {
    Users.findOne({userId: req.params.userId})
    .then((user) => {
        if (user != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.SGPA);
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
    Users.findOne({userId: req.params.userId})
    .then((user) => {
        if (user != null) {
            user.SGPA.push(req.body);
            user.save()
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);                
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
    res.end(`PUT operation not supported on /users/${req.params.userId}/SGPA`);
})
.delete((req, res, next) => {
    Users.findOne({userId: req.params.userId})
    .then((user) => {
        if (user != null) {
            for (var i = (user.SGPA.length -1); i >= 0; i--) {
                user.SGPA.id(user.SGPA[i]._id).remove();
            }
            user.save()
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);                
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

// Methods for http://localhost:3000/users/:userId/SGPA/:SGPAId API end point
usersRouter.route('/:userId/SGPA/:SGPAId')
.get((req,res,next) => {
    Users.findOne({userId: req.params.userId})
    .then((user) => {
        if (user != null && user.SGPA.id(req.params.SGPAId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.SGPA.id(req.params.SGPAId));
        }
        else if (user == null) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`SGPA ${req.params.SGPAId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /users/${req.params.userId}/SGPA/${req.params.SGPAId}`);
})
.put((req, res, next) => {
    Users.findOne({userId: req.params.userId})
    .then((user) => {
        if (user != null && user.SGPA.id(req.params.SGPAId) != null) {
            if (req.body.semester) {
                user.SGPA.id(req.params.SGPAId).semester = req.body.semester;
            }
            if (req.body.gradepoint) {
                user.SGPA.id(req.params.SGPAId).gradepoint = req.body.gradepoint;                
            }
            user.save()
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);                
            }, (err) => next(err));
        }
        else if (user == null) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`SGPA ${req.params.SGPAId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Users.findOne({userId: req.params.userId})
    .then((user) => {
        if (user != null && user.SGPA.id(req.params.SGPAId) != null) {
            user.SGPA.id(req.params.SGPAId).remove();
            user.save()
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);                
            }, (err) => next(err));
        }
        else if (user == null) {
            err = new Error(`User ${req.params.userId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`SGPA ${req.params.SGPAId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = usersRouter;