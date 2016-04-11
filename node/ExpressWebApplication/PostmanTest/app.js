var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var apis = require('./routes/api');

var app = express();

// shows the view src file with new lines and indents
// otherwise all contents will be in one line
app.locals.pretty = true;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// access static files by server/fileName
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'files')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', apis);



// catch 404 and forwarding to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not SDFSDF Found');
//    err.status = 404;
//    next(err);
//});

app.use(function(req, res, next) {
    res.status(404);
    //res.error.message = "NF";
    res.render('my404', {'message': 'apple'});
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('my500', {'message': 'papaya'});
});
// error handlers

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
