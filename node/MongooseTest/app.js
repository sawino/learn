var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./model/db');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var domain = require('domain');
//var mongoose = require('mongoose');
//var db = mongoose.createConnection('localhost',  'testdb');
//var PersonSchema = new mongoose.Schema({
//    name: String
//},
//    {
//        collection: "DDD"
//    });

//db.model('DDD', PersonSchema);
//db.on('error', console.error.bind(console,'connect error:'));
//db.once('open', function()
//{
//    console.log('db ready');
//});

var routes = require('./routes/index');
var users = require('./routes/users');
var user = require('./routes/user');
var project = require('./routes/project');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('MongoosePMSecret'));
app.use(session({
    cookie: {
        expires: new Date('December 30, 2014')
    },
    store: new mongoStore({
        db: 'MongoosePMSession',
        host: '127.0.0.1',
        port: 27017
    })
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/user', user.index);
app.get('/user/new', user.create);
app.get('/user/querytest', user.querytest);
app.post('/user/new', user.doCreate);
app.get('/user/edit', user.edit);
app.post('/user/edit', user.doEdit);
app.get('/user/delete', user.confirmDelete);
app.post('/user/delete', user.doDelete);
app.get('/login', user.login);
app.post('/login', user.doLogin);
//app.get('/logout', user.doLogout);
// tests
app.get('/validate', user.validate);
app.get('/complex', user.complex);
app.get('/subdoc', user.subdoc);
app.get('/plugin', user.plugin);
app.get('/domain', user.domain);

//app.get('/project/new', project.create);
//app.post('/project/new', project.doCreate);
app.get('/project/:id', project.displayInfo);
//app.get('/project/edit/:id', project.edit);
//app.post('/project/edit/:id', project.doEdit);
//app.get('/project/delete/:id', project.confirmDelete);
//app.post('/project/delete/:id', project.doDelete);
app.get('/project/byuser/:userid', project.byUser);



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
