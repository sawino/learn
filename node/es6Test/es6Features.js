'use strict';
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
};

exports.constTest = function() {
    var o = new E6C();
    o.constTest();  
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