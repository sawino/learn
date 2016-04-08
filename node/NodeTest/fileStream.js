// file stream could read large file without limitation of V8's maximum 1.4GB memory usage. 
var fs = require('fs');
var reader = fs.createReadStream('app.js');
// setEncoding enables the stream to know how to chunk the data
reader.setEncoding('utf-8');
var writer = fs.createWriteStream('out.txt');

// way 1
// reader.on('data', function(data) {
//     console.log(data);
//     writer.write(data);
// });

// reader.on('end', function() {
//     console.log('end');
//     writer.end();
// });

// console.log('code ended');

// way 2
reader.pipe(writer);