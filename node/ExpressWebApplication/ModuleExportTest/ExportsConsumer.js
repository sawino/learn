/**
 * Created by yangsaw on 6/24/2014.
 */
var JSExports = require("./JSExports.js");
console.log(JSExports.name);
console.log(JSExports.getName());
JSExports.setName("PIG");
console.log(JSExports.getName());
// none exported is private
var secret = JSExports.secret;
// print 'undefined'
console.log(secret);

var ModuleExports = require("./ModuleExports.js");
console.log(ModuleExports.getName());
console.log(ModuleExports.getSecret());

var ModuleExportsObject = require("./ModuleExportsObject.js");
console.log(ModuleExportsObject());

var JSAndModuleExports = require("./JSAndModuleExports.js");
console.log(JSAndModuleExports.getName());
