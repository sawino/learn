/**
 * Created by yangsaw on 11/16/2015.
 */
var express = require('express');
var router = express.Router();
var ToDoModel  = require('../models/ToDo');
router.post('/todos', function(req, res, next) {
    console.log(req.body.title);
    ToDoModel.create({
        title: req.body.title,
        note: req.body.note,
        updateAt: Date.now
    }, function(err, todo) {
        if  (err)
        {
            console.error(err);
            return res.send(err);
        }

        return res.send(todo);
    });
});

router.get('/todos', function(req, res, next) {
    console.log(req.globalVar);
    ToDoModel.find({},{title: 1, note: 1},function(err, todos) {
        if (err) {
            return res.send(err);
        }

        res.set('Content-Type', "text/plain");
        return res.send(todos);
    })
});

//router.put('/todos/:title', function(req, res, next) {
//    ToDoModel.findOneAndUpdate({title: req.params.title}, {$set: {note: "updated"}}, function(err, todo) {
//       if (err) {
//           return res.send(err);
//           }
//
//       return res.send(todo);
//    });
//});

router.put('/todos/:title', function(req, res, next) {
    ToDoModel.findOneAndUpdate({title: req.body.title}, {$set: {note: req.body.note}}, function(err, todo) {
        if (err) {
            return res.send(err);
        }

        return res.send(todo);
    });
});

router.delete('/todos/:title', function(req, res, next) {

    ToDoModel.findOne({title: req.params.title}, function(err, todo) {
        if (err) {
            return res.send(err);
        }

        console.log(todo);
        if (!todo || todo === 'undefined') {
            return res.send('not found');
        }
    });

    ToDoModel.findOneAndRemove({title: req.params.title}, function(err) {
        if (err) {
            return res.send(err);
        }

        return res.send(req.params.title + " deleted");
    });
});

router.get('/todos/:title', function(req, res, next) {
    ToDoModel.findOne({title: req.params.title}, function(err, todo) {
        if (err) {
            return res.send(err);
        }

        return res.send(todo);
    })
})
module.exports = router;