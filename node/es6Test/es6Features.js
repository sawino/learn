'use strict';
var Record = require('./models/Record');

function log(m) {
    console.log(m);    
};

class E6C {
    // only one
    constructor() {
        this.mA = 'mA';       
    }    
    
    printA() {
        // need this to call member
        // console.log(mA);
        console.log(this.mA);
    }
    
    constTest() {
        const a = 20;
        // a = 10;
        console.log(a);
    }
    
    static staticMethod() {
        console.log('static method');
    }
};

class SubClass extends E6C {
    
    constructor() {
        super();
    }
    
    printA() {
        console.log('sub mA');
    }
}

exports.letTest = function() {
  var a = 5;
  var b = 10;
  {
      // scope in the {} block
      let a = 3;
      // scope in the function
      var b = 1;
      console.log(a); // 3
      console.log(b); // 1
  }  
  
  console.log(a); // 5
  console.log(b); // 1
};


exports.classTest = function() {
    var o = new E6C();
    E6C.staticMethod();
    o.printA();
    
    var s = new SubClass();
    s.printA();
    
    log(s.p1);
    log(SubClass.sp);
};

exports.constTest = function() {
    var o = new E6C();
    o.constTest();  
    
    const pointerConst = {};
    pointerConst.value = 111;    
    console.log(pointerConst.value);
    
    // the object itself is const but not its children
    const  objectConst = Object.freeze({}) ;
    objectConst.value = 222;
    
    console.log(objectConst.value);
};

exports.templateStringTest = function() {
  var str = `
    This
    is
    long
    str     
  `;  
  
  var age = 3;
  var argStr = `samuel is ${age} years old`;
  
  log(str);
  log(argStr);
};

exports.lambdaTest = function() {
    var arr = [1, 2, 3];
    arr.forEach((o) => {
       log(o); 
    });
};

exports.objectTokenTest = function() {
  var name = 'samuel';
  var age = 3;
  
  var obj = {
      name,
      age
  };
  
  log(JSON.stringify(obj));
};

var promiseCount = 0;
function toggle() {
    promiseCount++;
    return (promiseCount % 2) == 0;
};

exports.promiseTest = function() {
    var p1 = new Promise(function(resolve, reject) {
        promiseCount++;
        
        if ((promiseCount % 2 ) == 0)
            resolve('Promise OK');
        else
            reject('Promise Rejected');
            
            
    });
    
    // then means resolved
    p1.then((v) => {
       log(v); 
    })
    // catch means rejected
    .catch((r) => {
       log(r);
    }); 
    
    // returns a resolved 
    var p2 = Promise.resolve(10); 
    
    var p3 = null;
    
    if ((promiseCount % 2) == 0) {
       p3 = Promise.resolve(20);    
    } else {
        // returns a rejected
        p3 = Promise.reject(30);  
    }
    
    // arg needs to be array    
    var pAll = Promise.all([p2, p3]);
    
    // arg is an array 
    // then means all promises resolved
    pAll.then((v1) => {
        log(`Promise all OK ${v1}`);
    })
    // catch means if one of the promises rejected
    // arg is a value
    .catch((v) => {
        log(`Promise all rejected ${v}`);
    });
    
    var p4 = new Promise((rs, rj) => {
        setTimeout(() => {
            rs(3);
        }, Math.random() * 300);    
    });
    
    var p5 = new Promise((rs, rj) => {
       setTimeout(() => {
           rj(5);
       }, Math.random() * 300); 
    });    
    
    var pRace = Promise.race([p4, p5]);
    
    // then means if any of the promises is resolved
    pRace.then((v) => {
        log(`Promise Race OK ${v}`);
    })
    // catch means if any of the promises is rejected
    .catch((v) => {
        log(`Promise race rejected ${v}`);
    });
    
}

exports.stringTest = function() {
    var str = "str";
    log(str.startsWith('s'));
    log(str.endsWith('r'));
    log(str.includes('t'));
    
    log(str.repeat(3)); 
}

function longTimeFun() {
    
    return new Promise((rs, rj) => {
        setTimeout(function() {
            if (toggle()) {
                rs(5);
            }
            else {
                rj(2);
            }
            
        }, 1000);   
    });
}

async function asyncF() {
      var v1, v2, v3;
    try {
        // v1 = await setTimer((v1) => { v1  = 3;}, 1000);
        v1 = await longTimeFun();
        log(v1);
        
        return Promise.resolve(v1);  
        
    } catch (e) {
        v1 = e;
        log(e);
        
        return Promise.reject(v1);
    }  
};

exports.asyncTest = function() {
    return asyncF();
};

exports.asyncMongooseTest = async function() {
    // all methods return Promise
    await Record.create({name: 's'});
    // all queries don't return Promise, but their exec() does.
    return await Record.find({}).exec();
};

exports.destructTest = () => {
    
    let [first, second, ...left] = [1, 2, 3, 4];
    log(first);
    log(second);
    log(left);
    
    let {foo: foo2, bar, baz: baz2 = 3} = {foo: 1, bar: 2};
    // assign foo to foo2
    log(foo2);
    // if the 'to' is not defined, use from
    log(bar);
    // the to can assign default value
    log(baz2);
    
    const [a, b] = 'hello';
    log(a);
    
    let {length: len} = 'hello';
    log(len);
    
    // return could be ignored if no {} 
    let mapResult = [[1, 2], [3, 4]].map(([x, y]) => {
        return x + y;
    });
    
    log(mapResult);
}   

exports.symbolTest = () => {
    let obj = {
        S1: Symbol('a'),
        S2: Symbol('a'),
        P1: 'a',
        P2: 'a'
    };
    
    // can't use like this
    // log(obj[S1]);
    log(obj.S1); // Symbol('a')
    log(obj.S1 === obj.s2); // false
    log(obj.P1 === obj.P2); // true
    
    let obj2 = {};
    let s = Symbol('s');
    // use [] to add symbol
    obj2[s] = 'sss';
    // use [] to read symbol
    log(obj2[s]);
    // undefined
    log(obj2.s);
};

exports.setMapTest = () => {
  let arr = [1, 2, 3, 4, 4, 5, 5];
  let setObj = new Set();
  arr.map(x => setObj.add(x));  
  log([...setObj]); // 1, 2, 3, 4, 5
  
  // other members
  // size, add(), delete(), has(), clear(), keys(), values(), entries(), forEach()
  
  // set could have array's functions
  setObj = new Set([...setObj].map(x => x * 2));
  setObj = new Set([...setObj].filter(x => x < 5));
  log([...setObj]); // [2, 4]
  
  // GC will not consider the items in the weak set.
  let weakSetObj = new WeakSet();
  // can add obj only, no size, forEach().
  weakSetObj.add({ x: 1});
  
  let mapObj = new Map();
  mapObj.set(0, 'hello');
  mapObj.set('a', 'b');
  for (let x of mapObj.keys()) {
      log(mapObj[x]);
  }
  // other methods
  // size, delete(), delete(), clear(), keys(), values(), entries(), forEach()
  
};

class IterTest {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }
    
    [Symbol.iterator]() { 
        return this;
    }
    
    next() {
        let v = this.value;
        if (v < this.stop) {
            this.value++;
            return {done: false, value: v};
        } else {
            return {done: true, value: undefined};
        }
    }
}

exports.iteratorTest = () => {
    let o = new IterTest(1, 5);
    for (let x of o) {
        log(x);
    }
};

function* generatorFun() {
    yield 1;
    yield* [2,3, 4];
    yield 5;
};

exports.generatorTest = () => {
    for (let x of generatorFun()) {
        log(x);
    }
    
    for (let x of generatorFun()) {
        log(x);
    }
};