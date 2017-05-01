'use strict';
import DarkSky from 'dark-sky'
const forecast = new DarkSky('f818aa39d9464507ac0601043b1c14db')
import fs from 'fs'

/* Node library for geocoding and reverse geocoding. Can be used as a nodejs library
https://www.npmjs.com/package/node-geocoder
*/
const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyA4KpaGlThNKTpSjVytMxAJqjP547EeOFY', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options)

module.exports = {
  getWeather: (city, callback) => {
    geocoder.geocode(city)
      .then(res => {
        return { long: res[0].longitude, lat: res[0].latitude }
      })
      .then((position) => {
        forecast
          .pos(position.long, position.lat)
          .extendHourly(true)
          .get()
          .then(res => {
            var json = JSON.stringify(res.hourly)
            callback(res.hourly)
            console.log('Success got weather data')
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err);
      });
  }
}
