/**
 * Created by yangsaw on 7/15/2014.
 */

var server = require('../bin/www');
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/MongoosePM';
// glocal connection
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('ms connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('ms error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('ms disconnected');
});

// default kill signal
//process.on('SIGTERM', function())
// ctrl + c
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        // close server when something bad happen
        server.server.close();
        console.log('ms ended through app termination');
        process.exit(0);
    });
});

process.on('error', function(err) {
    console.log(err);
    process.exit(0);
});

var userSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique: true},
    createdOn: {type: Date, default: Date.now},
    modifiedOn: Date,
    lastLogin: Date
});

userSchema.methods.logName = function() {
    console.log(this.name);
};
// compile
mongoose.model('User', userSchema, 'users');

var projectSchema = new mongoose.Schema({
    projectName: String,
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    createdBy: String,
    contributors: String,
    tasks: String
});

// should be added before compiling the model
projectSchema.statics.findByUserID = function(userID, callback) {
    this.find(
        { createdBy: userID },
        '_id projectName',
        { sort: 'modifiedOn'},
        callback);
}
 mongoose.model( 'Project', projectSchema);

//////////////////////////////////// validate test start
var weekdays = ['monday', 'tuesday'];
var lengthValidatorFunc = function(str)
{
    if (str.length < 6)
        return false;

    return true;
}

var emptyValidatorFunc = function(str) {
    if (str.length === 0)
        return false;

    return true;
}

var validateLengthFull = [{validator: lengthValidatorFunc, msg: 'Too short'}];
var validateLengthShort = [lengthValidatorFunc, 'Too short'];
var validateLength = {validator: lengthValidatorFunc, msg: 'short'};
// only the last message will show if both failed
var validatePassword = [
    {validator: emptyValidatorFunc, msg: 'Empty'},
    validateLength
];

var validateSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    age: {type: Number, min:5, max:20},
    // regular
    dayMatch: {type: String, match: /^(mon|tues)day$/i},
    dayEnum: {type: String, enum: weekdays},
    password: {type: String, validate: {validator: lengthValidatorFunc, msg: 'Short'}},
    passwordArray: {type: String, validate: validatePassword },
    babyNum: Number
});


mongoose.model('ValidateTest', validateSchema, 'validatetests');

validateSchema.path('babyNum').validate(function(value, respond) {
    mongoose.models['ValidateTest'].find({babyNum: value}, function(err, users) {
        if (err) {
            console.log(err);
            return respond(false);
        }

        //console.log('babyNum found');
        if (users.length)
        {
            return respond(false);
        }

        if (value >= 2)
        {
            return respond(false);
        }

        return respond(true);
        // the message will not show
    }, 'babyNum is invalid');
});

///////////////////////////////////////////////// validate test end

////////////////////////////////////// complex schema test start
var childSchema = new mongoose.Schema({
    name: String,
    age: Number
});

mongoose.model('Child', childSchema, 'children');

var parentSchema = new mongoose.Schema({
    name: String,
    childId: {type: mongoose.Schema.Types.ObjectId, ref:'Child'}
});

mongoose.model('Parent', parentSchema, 'parents');

var hostSchema = new mongoose.Schema({
    name: String,
    children: [childSchema]
});

mongoose.model('Host', hostSchema, 'hosts');
///////////////////////////////////// complex schema test end

var namePlugin = require('./namePlugin');
// plugin test start
var plugInSchema = new mongoose.Schema({
    age: Number
});
// reusable
plugInSchema.plugin(namePlugin);
plugInSchema.pre('save', function(next){
    this.age += 100;
    next();
});

mongoose.model('Plugin', plugInSchema, 'plugins');

// plugin test end
//var aa = new UserModel({
//    name: 'a',
//    email: "ddd",
//    //createdOn: new Date(),
//    modifiedOn: new Date(),
//    lastLogin: new Date()
//});
//
//aa.save(function(err) {
//    if (!err)
//        console.log('test save ok');
//    else
//        console.log(err);
//});