var express = require('express');
var session = require('express-session')
var MongoStore = require('connect-mongostore')(session)
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var regReq = require('./regReq')
var collections = require('./routes/collections')
var app = express();
app.set('trust proxy', true);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.configure('development',function(){
app.use(session({
		resave: false, 
		saveUninitialized: false,
		secret: 'my secret',
		store: new MongoStore({'db':'easydog', host: 'localhost'})
	}))
	//})
app.use(regReq)
//app.use(collections)
app.use('/', routes.router);

console.log('app.js time= '+Date.now())

//app.use('/db/insert', dbc)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    //res.send('404 not found')
});

// error handlers

// development error handler
// will print stacktrace

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


module.exports = app;
