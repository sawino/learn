'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
let io = null;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


var onlineUsers = {};
var onlineCount = 0;

app.initSocketIO = function initSocketIO(httpServer) {
  io = require('socket.io')(httpServer);

  io.on('connection', function(socket) {

    var clientIP = socket.request.connection.remoteAddress;
    socket.on('login', (obj) => {
      socket.name = obj.userid;
      
      if (!onlineUsers.hasOwnProperty(obj.userid)) {
        onlineUsers[obj.userid] = obj.username;
        onlineCount++;
      }

      io.emit('login', {
        onlineUsers: onlineUsers, onlineCount: onlineCount,  user: obj
      });

      console.log(obj.username + " joined chat room");
    });
    // send to all
    // socket.broadcast.emit('hi');
    console.log('new user connected');

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnect');        
        if (onlineUsers.hasOwnProperty(socket.name)) {
          var obj = {userid: socket.name, username: onlineUsers[socket.name]};

          delete onlineUsers[socket.name];
          onlineCount--;

          io.emit('logout', {
            onlineUsers:onlineUsers, onlineCount: onlineCount, user:obj
          });

          console.log(obj.username + " quit");
        }
    });

    socket.on('message', function(obj) {
      io.emit('message', obj);
      console.log(obj.username + " said " + obj.content);
    })
  });
}


module.exports = app;