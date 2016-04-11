var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var dirName = path.join(__dirname, 'public/stylus');


var stylus = require('stylus');
console.log(dirName);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.Router());
//app.use(stylus.middleware(path.join(__dirname, '/public/stylus')));
app.use(stylus.middleware({
    src: path.join(__dirname, '/resources/stylus'),
    dest: path.join(__dirname, '/public')// ,
    //include: path.join(__dirname, 'public/stylesheets'),
    //resolveURL: true,
    //paths: path.join(__dirname, 'public/stylesheets'),
    //dest: path.join(__dirname, 'public/stylesheets'),
    //force: true,
    //serve: true,

//    compile: function(str, path) {
//      console.log('compiling');
//        console.log(str);
//        console.log(path);
//        return stylus(str)
//            .set('filename', path)
//            .set('warn', true)
//            .set('compress', true);
//    },
    //compress: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
