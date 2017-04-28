var mongoose = require('mongoose');
// connect to a MongoDB database
mongoose.connect('mongodb://localhost/users');

// grab the user model
var User = require('./User.model');

// create new user

// Save new user