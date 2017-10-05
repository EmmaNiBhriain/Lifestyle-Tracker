var workouts = require('../models/workouts');
var express = require('express');
var router = express.Router();

router.findAll = function(req,res){
    //Return JSON version of the list of workouts
    res.json(workouts);
};


function getByValue(arr,id){
    var result = arr.filter(function(obj){return obj.id == id;});
    return result ? result[0] : null;
}

router.findById = function(req,res){
    var workout = getByValue(workouts, req.params.id);

    if(workout != null)
        res.json(workout);
    else
        res.json({message:'Workout Not Found!'})
};

router.addWorkout = function(req,res){
    var id = req.body.id;//Math.floor((Math.random()*1000000)+1); //random id
    var workouttype = req.body.workouttype;
    var duration = req.body.duration;
    var description = req.body.description;
    var time = req.body.time;
    var date = req.body.date;
    var intensity = req.body.intensity;
    var currentSize = workouts.length;

    var newworkout = {'id': id, 'workouttype':workouttype, 'duration':duration, 'description':description, 'time':time,'date':date, 'intensity': intensity};
    workouts.push({'id': id, 'workouttype':workouttype, 'duration':duration, 'description':description, 'time':time,'date':date, 'intensity': intensity});

    if((currentSize +1)==workouts.length)
        res.json({message:'Workout Added'});
    else
        res.json({message:'Workout Not Added'});

};

router.changeIntensity=function(req,res){
    //change the level of intensity
    var workout = getByValue(workouts, req.params.id);
    workout.intensity = req.body.intensity;
};

router.changeType = function(req,res){
    //update the type of workout
    var workout = getByValue(workouts, req.params.id);
    workout.workouttype = req.body.workouttype; //TODO read in the updated value
};

router.changeDuration = function(req, res){
    //update the duration of the workout
    var workout = getByValue(workouts, req.params.id);
    workout.duration = req.body.duration;
};

router.changeDescription = function(req, res){
    //update the duration of the workout
    var workout = getByValue(workouts, req.params.id);
    workout.description = req.body.description;
};

router.changeTime = function(req, res){
    //update the duration of the workout
    var workout = getByValue(workouts, req.params.id);
    workout.time = req.body.time;
};

router.changeDate = function(req, res){
    //update the duration of the workout
    var workout = getByValue(workouts, req.params.id);
    workout.date = req.body.date;
};


router.deleteWorkout = function(req, res) {
    //Delete the selected workout based on its id
    var workout = getByValue(workouts,req.params.id);
    var index = workouts.indexOf(workout);

    var currentSize = workouts.length;
    workouts.splice(index, 1);

    if((currentSize - 1) == workouts.length)
        res.json({ message: 'Workout Deleted!'});
    else
        res.json({ message: 'Workout NOT Deleted!'});
};

module.exports = router;