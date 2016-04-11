/**
 * Created by yangsaw on 6/24/2014.
 */
var secret = "ss";
module.exports = {
    name: "J",
    getName: function() {
        return this.name;
    },
    setName: function(val) {
        this.name = val;
    },
    getSecret: function() {
        // no this
        return secret;
    }
};

// this overwrites the above code
//module.exports = function() {
//    return "hello";
//};