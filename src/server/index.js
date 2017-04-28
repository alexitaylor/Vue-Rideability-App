import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import fs from 'fs'

import darkSky from './darkSky'

import router from './router'
import config from '../../webpack.config'

import mongoose from 'mongoose';
// grab the user model
import User from '../database/User.model';

const app = express()

// Connect to a MongoDB database
// mongoose.connect('mongodb://localhost/users');

// For more info: https://nodejs.org/api/process.html#process_process_env
// var mongoConnection = 'mongodb://localhost/users' || process.env.MONGODB_URL;
// if (!mongoConnection) {
//   console.log("Please define MONGODB_URL environment variable");
//   process.exit(1);
// }
// console.log('connecting to ' + mongoConnection);
// mongoose.connect(mongoConnection);

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


darkSky.getWeather()


// app.get(/.../, function(req, res) {
// });

// app.post(/.../, function(req, res) {
// });

app.listen(4000)
app.set('port', 4000);

console.log('Listening on', app.get('port'));

export default app
