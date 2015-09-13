var dbTools = require('../config/mysql.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport){

    passport.serializeUser(function (user, done) {
        done(null, user.name);
    });

    passport.deserializeUser(function (id, done) {
        dbTools.findUserById(id, function (err, rows, fields) {
            done(err, rows);
        })
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
        function (req, username, password, done) {
            dbTools.findUserByName(username, function (err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'User not found'));
                if (!dbTools.validPassword(password, user.password))
                    return done(null, false, req.flash('loginMessage', 'Invalid password!'));
                return done(null, user);            
        });
    }
    ));

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {
        process.nextTick(function () {
            dbTools.findUserByName(username, function (err, user) {
                console.log('!!!!!!', password);
                if (err)
                    return done(null);
                if (user)
                    return done(null, false, req.flash('signUpMessage', 'Username already in use'));
                var securePassword = dbTools.generateHash(password);
                dbTools.insertUser(username, securePassword);
            });
        });
    }
    ));

//passport.use('singup', new LocalStrategy({
//    passReqToCallback : true
//},
//function (req, username, password, done) {
//    findOrCreateUser = function () {
//        dbTools.findUserByName(username, function (err, rows, fields) {
//            if (rows) {
//                console.log("User already exists");
//            }
//            dbTools.insertUser(username, password);
//        });
//    }
//}
//));

}