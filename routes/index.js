var dbTools = require('../config/mysql.js');

exports.index = function (req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page1.' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
};

exports.register = function (req, res) {
    res.render('register', 200);
};

//GET rows fields
exports.getshowusers = function (req, res){
    dbTools.fetchUsers(function (rows, fields) {
        res.render('showusers', { rows : rows, fields : fields } );    
    });
}


exports.login = function (req, res){
    res.render('login', { message : req.flash('loginMessage') });    
}

exports.signup = function (req, res){    
    res.render('signup', { message : req.flash('signUpMessage') });
}

//POST name password
exports.postshowusers = function (req, res) {
    var name = req.param('name');
    var password = req.param('password');
    dbTools.insertUser(name, password);
    dbTools.fetchUsers(function (rows, fields) {
        res.render('showusers', { rows : rows, fields : fields });
    });
}

exports.adduser = function (req, res){
    var crypto = require('crypto');
    var algorithm = 'aes-256-ctr';
    var password = 'banana';
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(req.param('pwd'), 'utf8', 'hex');
    crypted += cipher.final('hex');
    console.log(crypted);
    res.render('register', {
        user: req.param('user'),
        pwd: crypted
    });
}

exports.loginPost = function (passport) {
        passport.authenticate('login', {
            successRedirect: '/showusers',
            failureRedirect: '/about'
        });
}
