/**
 * Created by yangsaw on 6/24/2014.
 */
var name = exports.name = "Hey";
var secret = "Judy";
exports.getName = function() {
    return name;
};

exports.setName = function(val) {
    name = val;
};
