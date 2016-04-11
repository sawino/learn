var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
//router.get('/', function(req, res) {
//
//    var PersonModel = req.db.model('DDD');
//    var personEntity = new PersonModel({name:'SSS'});
//    personEntity.save();
//    PersonModel.find(function(err, persons){
//        persons.forEach(function(person)
//        {
//            console.log(person.name);
//        });
//
//    });
//
//    res.send('ok');
//});

router.get('/', function(req, res) {
    res.render('index', {title: 'MongosePM Home'});
});



module.exports = router;
