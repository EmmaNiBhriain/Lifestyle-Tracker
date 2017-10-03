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
    workout.intensity +=1;
};

router.deleteDonation = function(req, res) {
    //Delete the selected donation based on its id
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