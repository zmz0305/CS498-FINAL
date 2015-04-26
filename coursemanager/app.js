var express = require('express');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport')
    , GoogleStrategy = require('passport-google').Strategy;
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

passport.use(new GoogleStrategy({
     returnURL: 'http://www.example.com/auth/google/return',
     realm: 'http://www.example.com/'
    },
    function(identifier, profile, done) {
     User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
     });
    }
));
var path = require('path');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var routes = require('./routes/index');
//var users = require('./routes/users');

mongoose.connect('mongodb://foo:bar@ds055709.mongolab.com:55709/cs498finalproject');

var app = express();

var port = process.env.PORT || 4000;

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiePaser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use('/', router);
app.use(passport.initialze());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/users', users);

var homeRoute = router.route('/');

homeRoute.get(function(req, res) {
    res.json({ message: 'Hello World!' });
});

// catch 404 and forward to error handler
/*
 app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });
 */

// error handlers

// development error handler
// will print stacktrace
/*
 if (app.get('env') === 'development') {
 app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: err
 });
 });
 }

 // production error handler
 // no stacktraces leaked to user
 app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: {}
 });
 });
 */

app.listen(port);
console.log('Server running on port ' + port);