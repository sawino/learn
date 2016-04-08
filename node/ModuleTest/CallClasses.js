/**
 * Created by yangsaw on 5/11/2014.
 */
var user1 = require("./DefineClassWithExports").User;
user1.showMessage();

var user2 = require("./DefineClassWithModule");
user2.showMessage();