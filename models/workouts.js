var mongoose = require('mongoose'); //allow interaction with the application where mongoose is imported

/**
 * Define a model with a list of attributes and the typed of data that will be stored.
 * @type {mongoose.Schema}
 */
var WorkoutSchema = new mongoose.Schema({
    workouttype: String,
    duration: Number,
    description: String,
    time: String,
    date: Date,  //use the mongoose data type 'Date'
    intensity: Number,
    userid: String
    //usertoken: String
});

module.exports = mongoose.model('Workout', WorkoutSchema);