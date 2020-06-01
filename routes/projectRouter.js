// Imported Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Projects = require('../models/projects');

const projectRouter = express.Router();

projectRouter.use(bodyParser.json());

// Methods for http://localhost:3000/projects/ API end point
projectRouter.route('/')
.get((req,res,next) => {
    Projects.find({})
    .then((projects) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(projects);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Projects.create(req.body)
    .then((project) => {
        console.log('Project Created ', project);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(project);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /projects');
})
.delete((req, res, next) => {
    Projects.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/projects/:projectId API end point
projectRouter.route('/:projectId')
.get((req,res,next) => {
    Projects.findById(req.params.projectId)
    .then((project) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(project);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /projects/'+ req.params.projectId);
})
.put((req, res, next) => {
    Projects.findByIdAndUpdate(req.params.projectId, {
        $set: req.body
    }, { new: true })
    .then((project) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(project);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Projects.findByIdAndRemove(req.params.projectId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Methods for http://localhost:3000/projects/:projectId/comments API end point
projectRouter.route('/:projectId/comments')
.get((req,res,next) => {
    Projects.findById(req.params.projectId)
    .then((project) => {
        if (project != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(project.comments);
        }
        else {
            err = new Error('Project ' + req.params.projectId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Projects.findById(req.params.projectId)
    .then((project) => {
        if (project != null) {
            project.comments.push(req.body);
            project.save()
            .then((project) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(project);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Project ' + req.params.projectId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /projects/'
        + req.params.projectId + '/comments');
})
.delete((req, res, next) => {
    Projects.findById(req.params.projectId)
    .then((project) => {
        if (project != null) {
            for (var i = (project.comments.length -1); i >= 0; i--) {
                project.comments.id(project.comments[i]._id).remove();
            }
            project.save()
            .then((project) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(project);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Project ' + req.params.projectId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/projects/:projectId/comments/:commentsId API end point
projectRouter.route('/:projectId/comments/:commentId')
.get((req,res,next) => {
    Projects.findById(req.params.projectId)
    .then((project) => {
        if (project != null && project.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(project.comments.id(req.params.commentId));
        }
        else if (project == null) {
            err = new Error('Project ' + req.params.projectId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /projects/'+ req.params.projectId
        + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    Projects.findById(req.params.projectId)
    .then((project) => {
        if (project != null && project.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                project.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                project.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            project.save()
            .then((project) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(project);                
            }, (err) => next(err));
        }
        else if (project == null) {
            err = new Error('Project ' + req.params.projectId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Projects.findById(req.params.projectId)
    .then((project) => {
        if (project != null && project.comments.id(req.params.commentId) != null) {
            project.comments.id(req.params.commentId).remove();
            project.save()
            .then((project) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(project);                
            }, (err) => next(err));
        }
        else if (project == null) {
            err = new Error('Project ' + req.params.projectId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = projectRouter;