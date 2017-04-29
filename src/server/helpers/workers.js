import _ from 'lodash'

// Hard Coded for now
let userPreferences = {
  tempLow: 50,
  tempHigh: 100,
  windHigh: 20,
  precipHigh: .5
}

let data = [{
  time: 1493784000,
  precipIntensity: 0.3,
  precipProbability: .3,
  temperature: 62.62,
  windSpeed: 14.95,
  windBearing: 263
}, {
  time: 1493784000,
  precipIntensity: 0.3,
  precipProbability: .3,
  temperature: 42.62,
  windSpeed: 14.95,
  windBearing: 263
}, {
  time: 1493784000,
  precipIntensity: 0.3,
  precipProbability: .3,
  temperature: 62.62,
  windSpeed: 24.95,
  windBearing: 263
}]

//given "0-360" returns the nearest cardinal direction "N/NE/E/SE/S/SW/W/NW/N"
exports.getCardinal = (angle) => {
  if (angle >= 0 && angle <= 22 || angle >= 338 && angle <= 360)
    return "N";
  if (angle >= 23 && angle <= 67)
    return "NE";
  if (angle >= 68 && angle <= 112)
    return "E";
  if (angle >= 113 && angle <= 157)
    return "SE";
  if (angle >= 158 && angle <= 202)
    return "S";
  if (angle >= 203 && angle <= 247)
    return "SW";
  if (angle >= 248 && angle <= 292)
    return "W";
  if (angle >= 293 && angle <= 337)
    return "NW";
  //Should never happen:
  return undefined;
};

/* Filter and render useable data from API */
exports.filterKeys = (obj) => {
  return _.reduce(obj, (acc, curr, key) => {
    if (_.includes(['time', 'precipIntensity', 'precipProbability', 'temperature', 'windSpeed', 'windBearing'], key)) {
      acc[key] = curr;
    }
    return acc;
  }, {})
};

exports.renderData = (arr) => {
  return _.map(arr, (obj, idx) => {
    return exports.filterKeys(obj)
  })
};
/* END of filtering/rendering data */

/*
Check if hour object is rideable based on user's preferences. Checking based on precip, wind, and temp
 */
exports.precipChecker = (dataObj, usersInputs) => {
  return dataObj.precipProbability <= usersInputs.precipHigh ? true : false;
};

exports.windChecker = (dataObj, usersInputs) => {
  return dataObj.windSpeed <= usersInputs.windHigh ? true : false;
};

exports.tempChecker = (dataObj, usersInputs) => {
  return (dataObj.temperature <= usersInputs.tempHigh && dataObj.temperature >= usersInputs.tempLow) ? true : false;
};

exports.allChecker = (obj, userInputs) => {
  let checkers = ['precipChecker', 'windChecker', 'tempChecker']
  var ridable = _.reduce(checkers, (acc, curr) => {
    acc.push(exports[curr].call(this, obj, userInputs))
    return acc
  }, [])
  return _.every(ridable)
};

exports.rideableRender = (data, userInputs) => {
  return _.map(data, (obj) => {
    return _.assign(obj, { rideable: exports.allChecker(obj, userInputs) })
  })
};
/* END of checking if rideable or not */
