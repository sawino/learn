'use strict'

var express = require('express');
var router = express.Router();
let path = require('path');
var spawn = require('child_process').spawn;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  let fp =  path.join(__dirname, "..", 'JasonListParseTest.exe');
  
  let cp = null;
  try {    
    cp = spawn(fp, [8, true]);
  }
  catch(e) {
    res.end("exception");
  }

  cp.stdout.on('data', function(data) {
    let bf = new Buffer(data, 'utf-8');
    
    console.log(bf.toString('utf-8'));
  });

  cp.stderr.on('data', function(data) {
    let bf = new Buffer(data, 'utf-8');
    
    console.log('error' + bf.toString('utf-8'));
    res.write("error " +bf.toString('utf-8'));
    // res.end();
  });

  cp.on('exit', function(code, signal) {
    console.log('exit code' + code);
    res.write("code " + code);
    res.end();
  });
  // res.render('index', { title: 'Express' });
});

module.exports = router;
