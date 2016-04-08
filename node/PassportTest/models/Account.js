var mongoose = require('mongoose');
var PassportLocalMongoose = require('passport-local-mongoose');
var AccountSchema = new mongoose.Schema({
    username: String,
    password: String
});

AccountSchema.plugin(PassportLocalMongoose);
module.exports = mongoose.model('Account', AccountSchema);