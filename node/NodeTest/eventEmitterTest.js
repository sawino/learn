var events = require('events');
var util = require('util');

function myEvent() {
    events.EventEmitter.call(this);
}

util.inherits(myEvent, events.EventEmitter);

var e = new myEvent();
e.on('sayHello', function(message) {
    console.log(message);
});

e.emit('sayHello', 'pig');