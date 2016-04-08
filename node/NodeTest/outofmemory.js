var useMem = function() {
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = 0;
    }
    
    return arr;
}

var all = [];

for (var j = 0;  j < 15; j++) {
    all.push(useMem());
    
    var usage = process.memoryUsage();
    console.log(usage);
}

