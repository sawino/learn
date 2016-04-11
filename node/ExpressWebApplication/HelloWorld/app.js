/**
 * Created by yangsaw on 6/24/2014.
 */
var http = require('http');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.static('./files'));
app.use(express.static('./downloads'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/say-hello', function(req, res){
    res.render('hello');
});

app.get('/test', function(req, res) {
    res.send("test");
});

http.createServer(app).listen(3000, function() {
    console.log('started');
});

