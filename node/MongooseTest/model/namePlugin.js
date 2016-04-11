/**
 * Created by yangsaw on 7/17/2014.
 */
var mongoose = require('mongoose');

var nameValidatorFun = function(value)
{
    if (value.length === 0)
        return false;

    return true;
};

var nameValidator = { validator: nameValidatorFun, msg: 'name is empty'};


module.exports = function(schema, options) {
    schema.add(
        {
            name: {type: String, validate: nameValidator}
        });

    // pre and post
    // options: save, init, validate, remove
    schema.pre('save', function(next) {
        this.name += "_suffix";
        next();
    });
};