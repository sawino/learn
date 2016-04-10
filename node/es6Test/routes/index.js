var express = require('express');
var router = express.Router();
var e6 = require('../es6Features');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/letTest', function(req, res, next) {    
    e6.letTest();
    
    res.status(200).end('OK');
});

router.get('/classTest', function(req, res) {
  e6.classTest();
  res.status(200).end('OK');  
});

router.get('/constTest', function(req, res) {
  e6.constTest();
  res.status(200).end('OK');  
});

router.get('/templaetStringTest', function(req, res) {
  e6.templateStringTest();
  res.status(200).end('OK');  
});

router.get('/lambdaTest', function(req, res) {
  e6.lambdaTest();
  res.status(200).end('OK');  
});

router.get('/objectTokenTest', function(req, res) {
  e6.objectTokenTest();
  res.status(200).end('OK');  
});

router.get('/promiseTest', function(req, res) {
  e6.promiseTest();
  res.status(200).end('OK');  
});

router.get('/stringTest', function(req, res) {
  e6.stringTest();
  res.status(200).end('OK');  
});

router.get('/asyncTest', async function(req, res) {
    
    try {
        // console.log('s1');
        var v = await e6.asyncTest();
        console.log('resolve ' + v);
        res.status(200).end(v.toString());
    }
    catch (err) {
        console.log('reject ' + err);
        res.status(200).end(err.toString());
    }
});

router.get('/asyncMGTest', async function(req, res) {
   try {
       var v = await e6.asyncMongooseTest();
       debug(v);
       res.status(200).end(JSON.stringify(v));
   } 
   catch (e) {
       res.status(200).end(JSON.stringify(e));
   }
});


module.exports = router;
