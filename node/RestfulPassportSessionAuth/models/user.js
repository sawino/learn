/**
 * Created by yangsaw on 7/31/2014.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    local       : {
        email   : String,
        password: String
    },
    google      : {
        id      : String,
        token   : String,
        email   : String,
        name    : String
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', UserSchema);
