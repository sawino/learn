var mongoose = require('mongoose');
var bb = require('bluebird');

mongoose.Promise = bb;
// var debug = require('debug');
mongoose.connect('mongodb://localhost/es6Test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    debug('db connected'); 
});
// db.on('closed', function() {
//     debug('db closed');
// })