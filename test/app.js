var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

var routes = require('./routes');
var users = require('./routes/user');
var movie = require('./routes/movie');

var SessionStore = require("session-mongoose")(express);
var store = new SessionStore({
    url: "mongodb://localhost/session",
    interval:120000
});

var log4js = require('log4js');
log4js.configure({
    appenders:[
    {type:'console'},//控制台输出
    {
        type:'file',//文件输出
        filename:'logs/access.log',
        maxLogSize:1024,
        backups:3,
        category:'normal'
    }
    ],
    replaceConsole:true
});
var Logger = log4js.getLogger('normal');
Logger.setLevel('INFO');


var app = express();
var ejs = require('ejs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(partials());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(express.methodOverride());
app.use(cookieParser());
app.use(express.cookieSession({secret:'fens.me'}));
app.use(express.session({
    secret:'fens.me',
    store:store,
    cookie:{maxAge:900000}
}));
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message='';
    if(err)res.locals.message = '<div class="alert alert-error">' +err+ '</div>';
    next();
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(log4js.connectLogger(Logger,{level:log4js.levels.INFO,format:':method:url'}));
app.use(app.router);


app.get('/', routes.index);
app.all('/login',notAuthentication);
app.get('/login',routes.login);
app.post('/login',routes.doLogin);
app.get('/logout',authentication);
app.get('/logout',routes.logout);
app.get('/home',authentication);
app.get('/home',routes.home);

app.get('/users', users.list);
app.post('/home',routes.home);

app.get('/list',movie.movie);
app.get('/net',routes.nets);
// app.get('/movie/add',movie.movieAdd);//增加
// app.post('/movie/add',movie.doMovieAdd);//提交
// app.get('/movie/:name',movie.movieAdd);//编辑查询
// app.get('/movie/json/:name',movie.movieJSON);//JSON数据

function authentication(req,res,next){
    if(!req.session.user){
        req.session.error='Please sign_in';
        return res.redirect('/login');
    }
    next();
}
function notAuthentication(req,res,next){
    if(req.session.user){
        req.session.error = 'Already in';
        return res.redirect('/');
    }
    next();
}

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
exports.Logger = function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}