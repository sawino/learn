var express = require('express');
var passport = require('passport');
var Account = require('../models/Account');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: req.user });
});

router.get('/register', function (req, res) {
    res.send('get register');
});

router.post('/register', function (req, res) {
    
    console.log(req.body);
    Account.register(new Account({
        username: req.body.username,
    }),
        req.body.password,
        function (err, user, info) {
        if (err)
            return res.send('register error');
        
        req.logIn(user, function (err) {
            if (err)
                return res.send(err);
            
            return res.send(req.user);
               
        });
        //req.logIn(user, function (err) {
        //    if (err)
        //        return res.send(err);
            
        //    return res.send(user);
               
        //});
    });

});

router.get('/login', function (req, res) {
    
    console.log(req);
    console.log(req.session);
    console.log(req.user);
    if (req.isAuthenticated())
        return res.send('logged in already');
    
    if (req.isUnauthenticated())
        return res.send('un au');

    res.send('not logged in');
});


router.post('/login', passport.authenticate('local'), function (req, res) {
    res.send('login failed');
});

router.get('/logout', function (req, res) {
    var user = req.user; 
    req.logout();
    res.send('logged out: ' + JSON.stringify(user));
});
module.exports = router;