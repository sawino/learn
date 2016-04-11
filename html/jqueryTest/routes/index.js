var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
    fs.readFile('./index.html', function(err, html) {
        if (err) {
            throw err;
        }

        res.writeHeader(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();

    });

});

router.get('/getTest', function(req, res) {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    var str = JSON.stringify(req.query);

    str += JSON.stringify(req.params);

   res.json(str);
});

router.get('/getComplexTest/:hey', function(req, res) {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    var str = JSON.stringify(req.query);

    str += JSON.stringify(req.params);

    res.send(str);
});

router.get('/getJSONTest', function(req, res) {

    res.json(req.query);
});

router.get('/getScriptTest', function(req, res) {

    res.send('alert("s");');
});



router.post('/postTest', function(req, res) {
    res.json(req.body);
});

module.exports = router;
