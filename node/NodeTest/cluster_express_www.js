// #!/usr/bin/env node
// var debug = require('debug')('clusterTest');
// var app = require('../app');
// 
// app.set('port', process.env.PORT || 3000);
// 
// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });


// set DEBUG=myApp and start the server to print contents.
var debug = require('debug')('myApp');
var app = require('../app');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('starting host');
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();

    }
    
    cluster.on('listening', function(worker, address) {
    console.log('starting fork ' + worker.id + ' pid: ' + worker.process.pid); 
    });
    
    cluster.on('exit', function(worker, code, signal) {
        console.log('fork ' + worker.id + ' died. pid ' + worker.process.pid + '. restarting');
        setImmediate(function() {
        cluster.fork(); 
        });
    });
}
else {
    app.set('port', 3000);
    var server = app.listen(app.get('port'), function() {
        debug('express listening on ' + server.address().port);
    })
}