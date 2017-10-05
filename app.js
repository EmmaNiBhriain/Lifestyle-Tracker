var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var workouts = require("./routes/workouts");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/workouts', workouts.findAll);
app.get('/workouts/:id', workouts.findById);
app.post('/workouts', workouts.addWorkout); // test data: {"id":101110, "workouttype": "Run", "duration" : 30, "description": "Uphill Run with 30 second recovery inbetween", "time": "14:30", "date": 24062017, "intensity": 9}
app.put('/workouts/:id/intensity', workouts.changeIntensity);
app.put('/workouts/:id/workouttype', workouts.changeType);
app.put('/workouts/:id/duration', workouts.changeDuration);
app.put('/workouts/:id/description', workouts.changeDescription);
app.put('/workouts/:id/time', workouts.changeTime);
app.put('/workouts/:id/date', workouts.changeDate);
app.delete('/workouts/:id', workouts.deleteWorkout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
