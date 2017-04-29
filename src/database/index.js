let mongoose = require('mongoose');
// connect to a MongoDB database
mongoose.connect('mongodb://localhost/users');

// grab the user model
let User = require('./User.model');

// create new user hard coded for now
let user = new User({
  username: 'Nick',
  tempLow: 50,
  tempHigh: 100,
  windHigh: 20,
  precipHigh: .5
})

// Save new user
user.save(err => {
  if (err) throw err
  console.log('User saved successfully')
})