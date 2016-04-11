/**
 * Created by yangsaw on 7/15/2014.
 */
var mongoose = require('mongoose');
var User = mongoose.models['User'];
var ValidateTest = mongoose.models['ValidateTest'];
var domain = require('domain');

exports.create = function(req, res) {
    res.render('user-form', {
        title: 'Create User',
        name: '',
        email: '',
        buttonText: 'Join!'
    });
};

exports.doCreate = function(req, res) {

    // same as below
    // var user = new User();
    // user.save()

    // Model.create() == new&save
    User.create({
        name: req.body.FullName,
        email: req.body.Email,
        modifiedOn: Date.now(),
        lastLogin: Date.now()
    }, function(err, user) {
        if (!err) {
            console.log('created user: ' + user);
            req.session.user = { "name": user.name, "email": user.email, "_id": user._id};
            req.session.loggedIn = true;
            res.redirect('/user');
            //res.send('save ok');
        }
        else
        {
            if (err.code === 11000) {
                res.redirect('/user/new?exists=true');
            }
            else
            {
                res.redirect('/?error=true');
            }
            //res.send('save failed');
        }
    });
};

exports.index = function(req, res) {
    if (req.session.loggedIn === 'true') {
        res.render('user-page', {
            title: req.session.user.name,
            name: req.session.user.name,
            email: req.session.user.email,
            userID: req.session.user._id
        });
    }
    else {
        res.redirect('/login');
    }
};

exports.login = function(req, res) {
    res.render('login-form', {title: 'Log in'});
};

exports.doLogin = function(req, res) {
    if (req.body.Email) {
        User.findOne(
            {
                'email': req.body.Email
            },
            // select fields below
            '_id name email',
            function(err, user) {
                if (!err) {
                    if (!user) {
                        res.redirect('/login?404=user');
                    }
                    else {
                        req.session.user = {
                            'name': user.name,
                            'email': user.email,
                            '_id': user._id
                        };

                        req.session.loggedIn = 'true';
                        console.log(user + ' logged in');
                        //return res.redirect('/user');
//                        User.update(
//                            { _id: user._id},
//                            {$set: {lastLogin: Date.now()}},
//                            function(err, updatedUser) {
//                                if (err)
//                                {
//                                    return res.send(err);
//                                }
//
//                                //console.log(updatedUser.lastLogin);
//                                console.log('...');
//
//                                res.redirect('/user');
//                            });
                        User.findByIdAndUpdate(user._id, {lastLogin: Date.now()}, function(err, result) {
                            if (err)
                            {
                                return res.send('update error');
                            }

                            return res.redirect('/user');
                        });
                    }
                }
                else {
                    return res.redirect('/login?404=error');
                }
            }
        )
    }
    else
    {
        return res.redirect('/login?404=error');
    }
};

exports.querytest = function(req, res) {
    User.find({})
        .where('modifiedOn').gt(new Date('January 1, 2014'))
        .sort('-email')
        .select('_id name email lastLogin')
        .skip(0)
        .limit(10)
        .exec(function(err, users) {
            if (!err) {
                users.forEach(function(user) {
                    user.logName();
                });

                return res.send(users);
            }

            return res.send(err.message);
        });
};

exports.edit = function(req, res) {
    if (req.session.loggedIn !== true) {
        return res.redirect('/login');
    }

    res.render('user-form', {
        title: 'Edit profile',
        _id: req.session.user._id,
        name: req.session.user.name,
        email: req.session.user.email,
        buttonText: 'Save'
    });
};

exports.doEdit = function(req, res) {
    if (req.session.user._id) {
// way 1, find, edit, save
//        User.findById(req.session.user._id,
//            function(err, user) {
//                if (err) {
//                    console.log(err);
//                    return res.redirect('/user?error=finding');
//                }
//
//                user.name = req.body.FullName;
//                user.email = req.body.Email;
//                user.modifiedOn = Date.now();
//                user.save(function(errSave, newUser) {
//                    if (!errSave) {
//                        //console.log('user updated: ' + req.body.FullName);
//                        console.log(newUser.id);
//                        req.session.user.name = req.body.FullName;
//                        req.session.user.email = req.body.Email;
//                        res.redirect('/user');
//                    }
//                });
//            });

        // way two, in one shot
        User.findByIdAndUpdate(req.session.user._id, {'name': req.body.FullName, 'email': req.body.Email, 'modifiedOn': Date.now()}, function(err, result) {
            if (err)
                return res.redirect('/user?error=finding');

            req.session.user.name = req.body.FullName;
            req.session.user.email = req.body.Email;
            res.redirect('/user');
        });
    }
};

exports.confirmDelete = function(req, res) {
    res.render('user-delete-form', {
        title: 'Delete account',
        _id: req.session.user._id,
        name: req.session.user.name,
        email: req.session.user.email
    });
};

exports.doDelete = function(req, res) {
    if (req.session.user._id) {
        User.findOneAndRemove({_id: req.session.user._id},function(err, user) {
            if (err) {
                return res.redirect('/user?error=deleting');
            }

            clearSession(req.session, function() {
                res.redirect('/');
            });
        });
    }
};

var clearSession = function(session, callback) {
    session.destroy();
    callback();
};

/// validate test start
exports.validate = function(req, res) {
    ValidateTest.create({
        //name: "Sam",
        age: 1000,
        dayMatch: 'friday',
        dayEnum: 'wednesday',
        password: 'dd',
        passwordArray: 'ff',
        babyNum: 99
    }, function(err, result)
    {
        if (err) {
//            var str = '';
//            Object.keys(err.errors).forEach(function(key) {
//                str += key + ': ' + err.errors[key].message + '\n';
//            });
//
//            return res.send(str);

            return res.send(err);
        }

        return res.send('validateOK');
    });
};

// validate test end

// complex schema test start
exports.complex = function(req, res) {

// complex
    mongoose.models['Parent'].findOne({name:'papa'})
        // simple
        //.populate('childId', "name age")
        .populate({
            path: 'childId',
            match: { name:'a'},
            select: 'name age',
            options: {limit: 5, sort: 'name'}
        })
        .exec(function(err, result){
            if (!err)
                return res.send(result);

            return res.send('failed');

        });

    /*
    .populate({
        path: 'childId',
        match: { name:'a'},
        select: 'name age',
        options: {limit: 5, sort: 'name'}
        })

     */
};

exports.subdoc = function(req, res) {
    // host
    mongoose.models['Host'].create({
        name: "pig"
    }, function(err, host)
    {
        if (!err)
        {
            host.children.push({
                name: 'ccc',
                age: 555
            });

            host.save(function(err2, result){
                if (!err2) {
                    var str = JSON.stringify(result);
                    // 1st id() is to get an element
                    // 2nd _id is to retrieve the _id of a child
                    // 3rd id is to get the string of child._id
                    str += '\n' + result.children.id(result.children[0]._id).id;

                    res.send(str);
                }
                return res.send('save failed');
            });
        }
        else
        {
            return res.send('create failed');
        }
    });
};
// complex schema test end

// plugin test start
exports.plugin = function(req, res) {
    mongoose.models['Plugin'].create({
        name: 's',
        age: 5
    }, function(err, result) {
        if (!err) {
            return res.send(result);
        }

        return res.send('failed');
    });
};
// plugin test end

// domain test start
exports.domain = function(req, res) {
    // use domain to catch errors
    var d = domain.create();
    d.on('error', function(err) {

        console.log(err.stack);
        console.log(req.ip);
        res.send('...500 error');
    });

    d.run(function() {
        // cause error
        process.nextTick(function() {
            get_data();
        });
    });
};
// domain test end