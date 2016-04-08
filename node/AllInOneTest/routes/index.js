var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/serverResource', function(req, res) {
    res.send([
        {
            name: "SSSA"
        },
        {
            name: "SSSB"
        }
    ]);
});

module.exports = router;
