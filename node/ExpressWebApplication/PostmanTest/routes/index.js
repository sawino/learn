var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
    res.json({"hey": "judy"});
});

router.post('/', function(req, res) {
//    res.send(req.body);
//    res.send("as");
//    res.send(req.body);

//    var str = req.getContentType();
//    if (req.is('json'))
//    {
//        str = "yes";
//    }
//    else if (req.is('html'))
//    {
//        str = "no";
//    }
//
//
//
//    res.send(JSON.stringify(req.body) + str);
    res.send(JSON.stringify(req.query) + JSON.stringify(req.params) + JSON.stringify(req.body));
});

router.post('/paramtest/:a', function(req, res)  {
    res.set('AA', 'B');
    res.send(JSON.stringify(req.query) + JSON.stringify(req.params) + JSON.stringify(req.body));
});

router.post('/paramtest/:a/:b', function(req, res)  {
    res.set('C', 'D');

    res.send(JSON.stringify(req.query) + JSON.stringify(req.params) + JSON.stringify(req.body));
});

//router.get('/:a/:b', function(req, res)  {
//        res.send(req.params);
//});




// content type is application/json
router.get('/jsontest', function(req, res) {
    res.set('Content-Type', 'text/plain');
    res.json({"a": "b"});
});

router.get('/jadetest', function(req, res) {
    res.render('jadetest', {'title': "hello", "message": "pig"});
});

// content type is text/javascript
// call with /jsonptest, returns the json obj
// call with /jsonptest/?callback=xxx, will check xxx as a method, then run xxx(obj)
router.get('/jasonptest', function(req, res) {
    res.jsonp({'message': 'welcome'});
});

router.get('/file', function(req, res) {
    res.sendfile('./files/horde.png', function(e) {
        if (e) {
            console.log(e);
        }
        else
        {
            console.log('sent');
        }
    } );
});


router.get('/download', function(req, res) {
    res.download('./files/horde.png', 'shown-name.png', function(e) {
        if (e) {
            console.log(e);
        }
        else
        {
            console.log('sent');
        }
    } );
});

// error handles in app.js
router.get('/error', function(req, res) {
    errorMethod();
});


// content negotiation
router.get('/accept', function(req, res) {
    res.format({
        text: function() {
            res.send('text');
        },
        html: function() {
            res.send('<b>text</b>');
        },
        json: function() {
            res.json({message: 'welcome'});
        },
        default: function() {
            res.send(406, "Not aaaaaceptable");
        }
    });
});

router.get('/redirect', function(req, res) {
    res.location('/pigloc');
    res.send('ddd');
    //res.redirect('./file');
});

module.exports = router;
