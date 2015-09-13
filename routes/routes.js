module.exports = function (app, passport) {    
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/showusers',
        failureRedirect: '/login',     
        failureFlash : true
    }));
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/showusers',
        failureRedirect: '/signup',
        failureFlash : true   
    }))
}

function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    
    // if they aren't redirect them to the home page
    res.redirect('/');
}