var useMem = function() {
   
    // 20 -> 200 
    var size = 200 * 1024 * 1024;
    // Array -> Buffer
    var arr = new Buffer(size);
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

