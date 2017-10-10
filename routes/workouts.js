var Workout = require('../models/workouts');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.findAll = function(req,res){
    //Use the Workout model to find all the workout
    Workout.find(function(err,workouts){
        if(err)
            res.send(err);
        res.json(workouts); //return a json list of all workouts
    })
};

router.findById = function(req,res) {
    Workout.find({"_id": req.params.id}, function (err, workout) {
        if (err)
            res.json({message: 'Workout not Found', errmsg: err});
        else
            res.json(workout);
    })
}

/*router.findByDate = function(req,res){
    var workouts = getByDate(workouts, req.params.date);

    if (workouts != null)
        res.json(workouts);
    else
        res.json({message:'Date Not Found!'})
}

function getByDate(arr,date){
    var result = arr.filter(function(obj){return obj.date == date;});
    return result ? result[0] : null;
}
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

    //save the workout and check for errors
    workout.save(function(err){
        if(err)
            res.send(err);

        res.json({message: 'Workout Added!', data: workout});
    });
}

router.changeIntensity=function(req,res) {

    Workout.findById(req.params.id, function(err,workout){
        if (err)
            res.send(err);
        else {
            workout.intensity = req.body.intensity;
            workout.save(function(err) {
                if (err)
                    res.send(err);
                else
                    res.json({message: 'Intensity of Workout Updated!', data: workout});
            });
        }
    });
}


router.changeType = function(req,res){
    //update the type of workout
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

router.changeDuration = function(req, res){
    //update the duration of the workout
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

router.changeDescription = function(req, res){
    //update the description of the workout
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


router.deleteWorkout = function(req, res) {
    Workout.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'Workout Deleted'});
    })
}

mongoose.connect('mongodb://localhost:27017/lifestyledb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});
module.exports = router;