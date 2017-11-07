var mongoose = require('mongoose'); //allow interaction with the application where mongoose is imported

/**
 * Define a model with a list of attributes and the typed of data that will be stored.
 * @type {mongoose.Schema}
 */
var UserSchema = new mongoose.Schema({
    userid: Number,
    firstname: String,
    surname: String,
    dateofbirth: Date
});

module.exports = mongoose.model('User', UserSchema);