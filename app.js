
/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var routes = require('./routes/');
var express = require('express');
var expressSession = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var app = express();
app.locals.pretty = true;

require('./config/passport.js')(passport);


// all environments
//app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressSession({ secret : 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.methodOverride());
app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

require('./routes/routes.js')(app, passport);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//dbTools.findUserByName("Dimba", function (err, rows, fields) {
//    //console.log(rows);
//});


//app.post('/login', passport.authenticate('login', {
//    successRedirect: '/showusers',
//    failureRedirect: '/about'
//}), routes.login);