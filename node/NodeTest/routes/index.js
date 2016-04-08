var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/fsTest', function(req, res) {
    var fileName = path.join(__dirname, 'users.js');
    fs.readFile(fileName, function(err, file) {
       if (err) {
           return res.send(err);
       }
       
       console.log(file);
       res.status
       res.setHeader('Content-Type', 'application/text');
       res.send(file); 
    });  
})

module.exports = router;
