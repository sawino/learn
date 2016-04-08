console.log('timer tests');

setTimeout(function() {
    console.log('setTimeout in 1000');
}, 1000);

var intervalRuns = 0;
var id = setInterval(function() {
    intervalRuns++;
    console.log('setInterval in 500, repeat ' + intervalRuns);
    
    if (intervalRuns > 3) {        
        clearInterval(id);
    }
}, 500);

setImmediate(function() {
    console.log('setImmediate');    
});

process.nextTick(function() {
   console.log('process nextTick'); 
});