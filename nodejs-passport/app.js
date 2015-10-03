// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var routes = require('./routes');
// var user = require('./routes/user');
// var multer = require('multer');
// var app = express();
// var passport = require('passport'),LocalStrategy = require('passport-local').Strategy;
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// // app.use(favicon());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(session({secret:'blog.fens.me',cookie:{maxAge:60000}}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(multer());
// app.use(express.static(path.join(__dirname, 'public')));
// passport.use('local',new LocalStrategy(
//      function(username,password,done){
//       var user = {
//         id:"1",
//         username:'admin',
//         password:'pass'
//       };
//       if(username !==username){
//         return done(null,false,{message:'Incorrect username.'});
//       }
//       if(password !==username){
//         return done(null,false,{message:'Incorrect password.'});
//       }

//       return done(null,user);
//      }
//   ));
// passport.serializeUser(function(user,done){
//   done(null,user);
// });

// passport.deserializeUser(function(user,done){
//   done(null,user);
// });



// app.get('/', routes.index);
// app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/users',
//         failureRedirect: '/'
//     }));
// app.all('/users', isLoggedIn);
// app.get('/users', user.list);
// app.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/');
// });
// function isLoggedIn(req,res,next){
//   if(req.isAuthenticated())
//     return next();

//   res.redirect('/');
// }
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });



// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , app = express();

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
     , GithubStrategy = require('passport-github').Strategy;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser())
app.use(express.session({secret: 'blog.fens.me', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; // 可以配置通过数据库方式读取登陆账号

        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));
passport.use(new GithubStrategy({
    clientID:"0df5c7eb9a1f19487141",
    clientSecret:"037c8b68a8394747ceaea86c70af8f98eda3b990",
    callbackURL:"http://localhost:3000/auth/github/callback"
},function(accessToken,refreshToken,profile,done){
     done(null,profile);
}))
passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});

app.get('/', routes.index);
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/'
    }));

app.all('/users', isLoggedIn);
app.get('/users', user.list);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
app.all('/github',isLoggedIn);
app.get('/github',user.github);

app.get("/auth/github",passport.authenticate("github",{scope:"email"}));
app.get("/auth/github/callback",
    passport.authenticate("github",{
        successRedirect:'/github',
        failureRedirect:"/"
    }));
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
