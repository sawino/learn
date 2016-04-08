var str = "你是一个haha.js";
var buf = new Buffer(str, 'utf-8');
console.log(buf);

var buf2 = new Buffer(1000);
console.log(buf2.length);

// 8192 ~= 8K
console.log(Buffer.poolSize);

// str conversion
// default to utf-8
var buf3 = new Buffer('转换abc.js', 'utf-8');
console.log(buf3.toString('utf-8'));

var buf4 = new Buffer(1000);
// wide char = 3 chars
// write(val, offset, length, encoding)
buf4.write('你好', 0, 6, 'utf-8');
// char and symbols = 1 char
buf4.write('abc.js', 6, 6, 'ascii');
console.log(buf4);
// toString(encoding, start, end), seems that 'end' is the next position of last char 
console.log(buf4.toString('utf-8', 0, 6));
console.log(buf4.toString('ascii', 6, 12));

console.log(Buffer.isEncoding('base64'));