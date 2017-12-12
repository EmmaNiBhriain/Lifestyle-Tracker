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

/**
 * Endpoints for the workouts model: GET, POST, PUT and DELETE
 */
app.get('/workouts', workouts.findAll);  //return all workouts
app.get('/workouts/:id', workouts.findById);  //return a single workout
app.get('/workouts/intensity/:intensity', workouts.findByIntensity);  //return all workouts with a certain intensity
app.get('/workouts/date/:date', workouts.findByDate);  //return all workouts with a certain date
app.get('/workouts/workouttype/:workouttype', workouts.findByType);  //return all workouts with a certain date
app.post('/workouts', workouts.addWorkout);  //add a new workout
app.put('/workouts/:id/intensity', workouts.changeIntensity);  //change the intensity of a workout
app.put('/workouts/:id/workouttype', workouts.changeType);  //change the type of workout
app.put('/workouts/:id/duration', workouts.changeDuration);  //change the duration of a workout
app.put('/workouts/:id/description', workouts.changeDescription);  //change the description of a workout
app.put('/workouts/:id/time', workouts.changeTime);  //change the time of a workout
app.put('/workouts/:id/date', workouts.changeDate);  //change the date of a workout
app.delete('/workouts/:id', workouts.deleteWorkout);  //delete a workout

//new: change owner of a workout
app.put('/workouts/:id/userid', workouts.changeUser);


/**
 * Endpoints for the users moodel
 */
app.get('/users', users.findAll); //return all users
app.get('/users/:userid', users.findByUserid); //find a particular user based on their userid
app.get('/users/:userid/workouts', users.findUserWorkouts); //return all workouts of a particular user
app.put('/users/:id/firstname', users.updateFirstname);
app.put('/users/:id/surname', users.updateSurname);
app.put('/users/:id/dateofbirth', users.updateDateofbirth);
app.post('/users', users.addUser); //add a new user
app.delete('/users/:id', users.deleteUser); //delete a user


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
