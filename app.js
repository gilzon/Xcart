var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var loginrouter = require('./routes/user');
var signuprouter = require('./routes/user');

const bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var app = express();
var fileUpload = require('express-fileupload')

var db = require('./config/connection');
var session=require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
  extname: 'hbs', defaultLayout: 'Layout', layoutsDir: __dirname + '/views/layout/', partialsDir: __dirname + '/views/partials',
  runtimeOptions: {
    allowprotopropertiesbydefault: true, allowInsecurePrototypeAccess: true,
    allowprotomethodbydefault: true
  },
},));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(session({secret:"key",cookie:{maxAge:600000}}))
db.connect((err) => {
  if (err) console.log("connection Error" + err);
  else console.log("Database connected to database 27017");

})
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/login',loginrouter)
app.use('/signup',signuprouter)



// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
