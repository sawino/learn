/**
 * Created by yangsaw on 7/31/2014.
 */
var mongoose = require('mongoose');
var dbConfig = require('../config/dbConfig');

var connectStr = dbConfig.url;
mongoose.connect(connectStr);
//mongoose.on('error', function(err)
//{
//    console.log(err);
//});
//
//mongoose.on('open', function() {
//    console.log('connected');
//});
