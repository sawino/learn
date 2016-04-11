/**
 * Created by yangsaw on 7/31/2014.
 */
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
    // passport session

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // default is username and password, override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allow to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // findOne happen after the data is sent back
        process.nextTick( function() {
            User.findOne({'local.email': email}, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'existed'));
                } else {
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }


            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        User.findOne({'local.email': email}, function(err, user) {
            if (err) {
                console.log('login err');
                return done(err);
            }

            if (!user) {
                console.log('login no user');

                return done(null, false, req.flash('loginMessage', 'not found'));
            }

            if (!user.validPassword(password)) {
                console.log('login wrong password');

                return done(null, false, req.flash('loginMessage', 'wrong password'));
            }

            console.log('login ok');

            return done(null, user);

        });
    }));
};