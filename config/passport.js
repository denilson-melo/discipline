var dbTools = require('../config/mysql.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport){

    passport.serializeUser(function (user, done) {
        done(null, user.name);
    });

    passport.deserializeUser(function (username, done) {
        dbTools.findUserByName(username, function (err, rows, fields) {
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
    
//body username, password, group
    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {
        process.nextTick(function () {
            //Gets the user group from the form
            var group = req.body.group;
            dbTools.findUserByName(username, function (err, user) {
                if (err)
                    return done(null);
                if (user)
                    return done(null, false, req.flash('signUpMessage', 'Username already in use'));
                //Encrypt password and insert the user with it
                var securePassword = dbTools.generateHash(password);
                dbTools.insertUser(username, securePassword, group);
                //Find the user again to return it to the callback
                dbTools.findUserByName(username, function (err, user){
                    return done(null, user);
                })
            });
        });
    }
    ));

}