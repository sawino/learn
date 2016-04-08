/**
 * Created by yangsaw on 11/16/2015.
 */

var mongoose = require('mongoose');
var dbConfig = require('../config/dbConfig');

module.exports.init = function() {
    mongoose.connect(dbConfig.connectString, function(err) {
        console.log('DB connected');
    });
};

module.exports.db = mongoose;
