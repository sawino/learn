/**
 * Created by yangsaw on 7/31/2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('bear', BearSchema);