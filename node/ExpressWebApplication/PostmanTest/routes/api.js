/**
 * Created by yangsaw on 7/1/2014.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("hey");
});

// :p will hide /:p-:s, so don't use send or json and call next()
router.get('/:p', function(rq, res, next) {
    // set header
    res.set('JJJ', 'fddd');
    next();
//    res.send(rq.params.p);
//    res.send("sss");
});

router.get('/:p-:s', function(req, res) {
    res.set('PIG', 'pig');
    res.send(JSON.stringify(req.params));
});

module.exports = router;