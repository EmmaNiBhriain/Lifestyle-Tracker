var Workout = require('../models/workouts');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/**
 * Return all workouts
 * @param req
 * @param res
 */
router.findAll = function(req,res){
    //Use the Workout model to find all the workout
    Workout.find(function(err,workouts){
        if(err)
            res.send(err);
        res.json(workouts); //return a json list of all workouts
    })
};

/**
 * Return the data of a selected workout
 * @param req
 * @param res
 */
router.findById = function(req,res) {
    Workout.find({"_id": req.params.id}, function (err, workout) {
        if (err)
            res.json({message: 'Workout not Found', errmsg: err});
        else
            res.json(workout);
    })
}

/**
 * Return all workouts with the specified intensity
 * @param req
 * @param res
 */
router.findByIntensity = function(req, res) {
    Workout.find({"intensity": req.params.intensity}, function(err, workouts){
        if(err)
            res.json({message: 'Workout intensity not Found', errmsg: err});
        else
            res.json(workouts);
    })
}

/**
 * Return all workouts on a particular day
 * @param req
 * @param res
 */
router.findByDate = function(req, res) {
    Workout.find({"date": req.params.date}, function(err, workouts){
        if(err)
            res.json({message: 'Date not Found', errmsg: err});
        else
            res.json(workouts);
    })
}

/**
 * Return all workouts with the specified workout type
 * @param req
 * @param res
 */
router.findByType = function(req, res) {
    Workout.find({"workouttype": req.params.workouttype}, function(err, workouts){
        if(err)
            res.json({message: 'Date not Found', errmsg: err});
        else
            res.json(workouts);
    })
}


/**
* Add a new workout to the mongo database
* The parameters of a workout object are: workouttype, duration, description, time, date, intensity
*/
router.addWorkout = function(req,res){
    var workout = new Workout();
    workout.intensity = req.body.intensity;
    workout.date = req.body.date;
    workout.time = req.body.time;
    workout.description = req.body.description;
    workout.duration = req.body.duration;
    workout.workouttype = req.body.workouttype;
    console.log('Adding workout:' + JSON.stringify(workout));

    /*save the workout and check for errors
      If no errors occur, return the message 'Workout Added!' along with the details of the new workout*/
    workout.save(function(err){
        if(err)
            res.send(err);

        res.json({message: 'Workout Added!', data: workout});
    });
}

/**
 * Change the intensity field of a workout
 * @param req
 * @param res
 */
router.changeIntensity=function(req,res) {

    Workout.findById(req.params.id, function(err,workout){
        if (err)
            res.send(err);
        else {
            workout.intensity = req.body.intensity;  //assign the intensity field of the workout the new value
            workout.save(function(err) {
                if (err)
                    res.send(err);
                else
                    res.json({message: 'Intensity of Workout Updated!', data: workout});
            });
        }
    });
}

/**
 * Change the workouttype field of the workout
 * @param req
 * @param res
 */
router.changeType = function(req,res){
    Workout.findById(req.params.id, function(err,workout){
        if(err)
            res.send(err);
        else{
            workout.workouttype = req.body.workouttype;
            workout.save(function(err){
                if(err)
                    res.send(err);
                else
                    res.json({message: 'Workout Type Updated!', data: workout});
            })
        }
    })
};

/**
 * Change the value of the duration field of the selected workout
 * @param req
 * @param res
 */
router.changeDuration = function(req, res){
    Workout.findById(req.params.id, function(err,workout){
        if(err)
            res.send(err);
        else{
            workout.duration = req.body.duration;
            workout.save(function(err){
                if(err)
                    res.send(err);
                else
                    res.json({message: 'Duration Updated!', data: workout});
            })
        }
    })
};

/**
 * Change the description of a workout
 * @param req
 * @param res
 */
router.changeDescription = function(req, res){
    Workout.findById(req.params.id, function(err,workout){
        if(err)
            res.send(err);
        else{
            workout.description = req.body.description;
            workout.save(function(err){
                if(err)
                    res.send(err);
                else
                    res.json({message: 'Workout Description Updated!', data: workout});
            })
        }
    })
};

/**
 * Change the time value of the workout
 * @param req
 * @param res
 */
router.changeTime = function(req, res){
    //update the duration of the workout
    Workout.findById(req.params.id, function(err,workout){
        if(err)
            res.send(err);
        else{
            workout.time = req.body.time;
            workout.save(function(err){
                if(err)
                    res.send(err);
                else
                    res.json({message: 'Time Updated!', data: workout});
            })
        }
    })
};

/**
 * Change the date of the workout
 * @param req
 * @param res
 */
router.changeDate = function(req, res){
    //update the duration of the workout
    Workout.findById(req.params.id, function(err,workout){
        if(err)
            res.send(err);
        else{
            workout.date = req.body.date;
            workout.save(function(err){
                if(err)
                    res.send(err);
                else
                    res.json({message: 'Workout Type Updated!', data: workout});
            })
        }
    })
};

/**
 * Delete the selected workout
 * @param req
 * @param res
 */
router.deleteWorkout = function(req, res) {
    Workout.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'Workout Deleted'});
    })
}

//useMongoClient is added as the default connection logic is deprecated
mongoose.connect('mongodb://localhost:27017/lifestyledb', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});
module.exports = router;