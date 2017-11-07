var User = require('../models/users');
var Workout = require('../models/workouts');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.findAll = function(req,res){
    //Use the User model to find all the users
    User.find(function(err,users){
        if(err)
            res.send(err);
        res.json(users); //return a json list of all workouts
    })
};

/**
 * List all workouts of a particular user
 * @param req
 * @param res
 */
router.findUserWorkouts = function(req, res) {
    Workout.find({"userid": req.params.userid}, function(err, workouts){
        if(err)
            res.json({message: 'Workouts not Found', errmsg: err});
        else
            res.json(workouts);
    })
};

router.findByUserid = function(req, res) {
    User.find({"userid": req.params.userid}, function(err, user){
        if(err)
            res.json({message: 'User ID not Found', errmsg: err});
        else
            res.json(user);
    })
};

router.updateFirstname = function(req,res) {

    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        else {
            user.firstname = req.body.firstname;
            user.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({message: 'First name updated!', data: user});
            });
        }
    })
};

router.updateSurname = function(req,res) {

    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        else {
            user.surname = req.body.surname;
            user.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({message: 'Surname updated!', data: user});
            });
        }
    })
};

router.updateDateofbirth = function(req,res) {

    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        else {
            user.dateofbirth = req.body.dateofbirth;
            user.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({message: 'Date of Birth updated!', data: user});
            });
        }
    })
};

router.addUser = function(req,res){
    var user = new User();
    user.userid = req.body.userid;
    user.firstname = req.body.firstname;
    user.surname = req.body.surname;
    user.dateofbirth = req.body.dateofbirth;
    console.log('Adding user:' + JSON.stringify(user));

    /*save the user and check for errors
      If no errors occur, return the message 'User Added!' along with the details of the new workout*/
    user.save(function(err){
        if(err)
            res.send(err);

        res.json({message: 'User Added!', data: user});
    });
};

router.deleteUser = function(req, res) {
    User.findByIdAndRemove(req.params.userid, function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'User Deleted'});
    })
};


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