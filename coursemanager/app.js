var express = require('express');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var router = express.Router();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');


var routes = require('./routes/index');
var users = require('./routes/users');
var repositories = require('./routes/repositories');
var login = require('./routes/login');

mongoose.connect('mongodb://foo:bar@ds055709.mongolab.com:55709/cs498finalproject');

var app = express();

var port = process.env.PORT || 4000;

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
};
app.set('view engine', 'jade');
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.methodOverride());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(__dirname, 'public'));
//app.use('/users', users);

// catch 404 and forward to error handler
// view engine setup
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
app.use('/api/repositories', repositories);
app.use('/api/login', login);
app.set('views', path.join(__dirname, 'views'));

app.use('/api/users', users);
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