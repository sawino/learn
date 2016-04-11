var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res) {
    res.render('search');
});

router.get('/search-result', function(req, res) {
   res.send(req.query.name + ": " + req.query.source + JSON.stringify(req.query.skills));
});

router.post('/signup', function(req, res) {
//    res.send(req.body.name + " " + req.body.email);
    res.json(req.body);
});

router.post('/upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        console.log('uploading:' + filename);
        var pathStr = __dirname + '/../files/';
        if (!fs.existsSync(pathStr))
        {
            fs.mkdirSync(pathStr);
        }
        fstream = fs.createWriteStream(pathStr + filename);
        file.pipe(fstream);
        fstream.on('close', function() {
            res.send("OK");
        });
    });
});

router.get('/cookietest', function(req, res) {
    var count = req.signedCookies.count || 0;

    count++;
    console.log(count);
    res.cookie('count', count, {'maxAge': 2000,'signed': true });
    res.send('c:' + count);
});

router.get('/deletecookie', function(req, res) {
    res.clearCookie('count');
    res.send('count deleted');
});

router.get('/sessiontest', function(req, res) {
    if (req.session.count == null)
    {
        console.log('create session');
        req.session.count = 1;
    }

    req.session.count++;
    console.log(req.session.count);
    res.send('session count: ' + req.session.count);
});

router.get('/deletesession', function(req, res) {

    req.session.destroy(function() {
        res.send('deleted');
    });
});

module.exports = router;
