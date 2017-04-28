'use strict';
const DarkSky = require('dark-sky')
const forecast = new DarkSky('f818aa39d9464507ac0601043b1c14db')

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
  getWeather: () => {
    geocoder.geocode('San Francisco')
      .then(res => {
        return { long: res[0].longitude, lat: res[0].latitude }
      })
      .then((position) => {
        forecast
          .pos(position.long, position.lat)
          .extendHourly(true)
          .get()
          .then(res => {
            console.log(res.hourly)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err);
      });
  },
  printSomething: () => {
    console.log('testing123============================')
  }
}
