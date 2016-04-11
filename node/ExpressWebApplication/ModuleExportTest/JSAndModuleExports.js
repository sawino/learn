/**
 * Created by yangsaw on 6/24/2014.
 */

// takes precedence, covers exports.getName
module.exports = {
    getName: function() {
        return "Module Exports";
    }
};

exports.getName = function() {
    return "JS Exports";
};