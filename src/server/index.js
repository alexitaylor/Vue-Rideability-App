const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = 'fs'

const darkSky = require('./darkSky');
const workers = require('./helpers/workers');

const router = require('./router');
const config = require('../../webpack.config');

const mongoose = require('mongoose');
// grab the user model
const User = require('../database/User.model');

const app = express()

// Connect to a MongoDB database
// mongoose.connect('mongodb://localhost/users');

// For more info: https://nodejs.org/api/process.html#process_process_env
var mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost/rideable';
if (!mongoConnection) {
  console.log("Please define MONGODB_URL environment variable");
  process.exit(1);
}
console.log('connecting to ' + mongoConnection);
mongoose.connect(mongoConnection);

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(webpackHotMiddleware(compiler))

/* Following middleware, because had issues with no 'Access-Control-Allow-Origin'
Thanks to:
http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue */
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use('/', router)


// let data = fs.readFileSync('data.json')
// let parsedData = JSON.parse(data)

// let renderedMore = workers.renderData(parsedData.data)
// let rideableRender = workers.rideableRender(renderedMore, userPreferences)

// console.log(rideableRender)
// darkSky.getWeather('San Francisco')

// Save user to MongoDB
// workers.saveUser(userPreferences)


app.get('/user', function(req, res) {
  console.log('GOT SOMETHING')
  console.log(req.query)
  workers.retrieveUser(req.query.username, (err, user) => {
    if (err) throw err
    res.json(user)
  })
});

app.get('/city', function(req, res) {
  let userPreferences = JSON.parse(req.query.userPreferences)
  console.log('GOT CITY')
  console.log(req.query.city)
  console.log(req.query.userPreferences)
  darkSky.getWeather(req.query.city, (data) => {
    let renderedData = workers.renderData(data.data)
    let rideableData = workers.rideableRender(renderedData, userPreferences)
    console.log(rideableData)
    res.json(rideableData)
  });
  // res.send(200)
});

app.post('/user', function(req, res) {
  console.log('POST SOMETHING')
  console.log(req.body)
  workers.saveUser(req.body.userPreferences)
  res.send(200)
});

// app.post(/.../, function(req, res) {
// });

app.listen(4000)
app.set('port', 4000);

console.log('Listening on', app.get('port'));

export default app
