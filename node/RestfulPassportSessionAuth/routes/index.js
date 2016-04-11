var express = require('express');
var router = express.Router();
var fs = require("fs");
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res) {
//  fs.readFile('index.html', function(err, data) {
//      if  (err) {
//          res.send(err);
//      }
//      res.writeHeader(200, {'Content-Type': 'text/html'});
//      res.write(data);
//      res.end();
//  });

    res.sendfile('index.html');
});

// default
//router.post('/login', passport.authenticate('local-login', {
//        successRedirect:'/profile',
//        failureRedirect:'/loginerr',
//        failureFlash:true
//}));

// custom
router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err)
        {
//            return next(err);
            console.log('route err 1');

            return res.send('custom error');
        }


        if (!user) {
            console.log('route no user');

            return res.send(req.flash('loginMessage'));
        }

        console.log('route center');


        req.logIn(user, function(err) {
            if (err) {
                console.log('route err 2');

                return res.send('custom err');
            }

            console.log('route ok');

            return res.send('custom OK');
        });
    })(req, res, next);
});

router.get('/loginerr', function(req, res) {
    res.send(req.flash('loginMessage'));
});

//router.get('/signup', function(req, res) {
//    res.send(req.flash('singupMessage'));
//});

router.get('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signuperr',
    failureFlash: true
}));

router.get('/signuperr', function(req, res) {
    res.send(req.flash('signupMessage'));
});

router.get('/profile', function(req, res) {
    if (req.user)
    {
        var str = 'user logged in->profile';
        str += JSON.stringify(req.user);
        if  (req.session)
        {
            str += JSON.stringify(req.session);
        }
        res.send(str);
    }
    else
    {
        res.send('user not logged in');
    }
});

router.get('/logout', function(req, res) {
    if (req.user)
    {
        req.logout();
        res.redirect('/profile');

    }
    else
    {
        res.send('did not have user');
    }
});

router.get('/logout', function(req, res) {
    res.send('logout');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
module.exports = router;
