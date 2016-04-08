/**
 * Created by yangsaw on 11/16/2015.
 */
var db = require('../init/mongooseInit').db;

var ToDoSchema = new db.Schema({
    title: String,
    note: String,
    updatedAt: { type: Date, default: Date.now}
});

var model = db.model('ToDo', ToDoSchema);

module.exports = model;