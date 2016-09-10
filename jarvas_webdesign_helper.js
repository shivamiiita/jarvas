/*********************************************************************************
*     File Name           :     jarvas_webdesign_helper.js
*     Created By          :     shivam.gupta
*     Creation Date       :     [2016-09-09 13:44]
*     Last Modified       :     [2016-09-10 04:17]
*     rization: Bearer 7wbOTxM8l6X2Lqy7cFT(gRThK&Gr0CovQ9r2cBO9yiCXt5Tr#KTQ@hUGa2(Hfu^N' \
*
*     Description         :      
**********************************************************************************/

'use strict'

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://services.faa.gov/airport/status/';

function JarvasWebdesignHelper() {}

JarvasWebdesignHelper.prototype.requestAirportStatus = function(airportCode) {
  return this.getAirportStatus(airportCode).then(
    function(response) {
          console.log('success - received airport info for ' + airportCode);
          return response.body;
        }
  );
};

JarvasWebdesignHelper.prototype.updateWebsite = function(modifiee, prevColor, newColor) {
  console.log('updating ' + modifiee + " from " + prevColor + " " + newColor);
  console.log("Returning from call");
  var airportCode = "SFO";
  return this.getAirportStatus(airportCode).then(
    function(response) {
          console.log('success - received airport info for ' + airportCode);
          return response.body;
        }
  ).catch(function (err) {
         console.log('Error is ' + JSON.stringify(err));
  });
};

JarvasWebdesignHelper.prototype.requestNewBlog = function(airportCode) {
  return this.createNewBlog(airportCode).then(
    function(response) {
          console.log('success - received airport info for ' + airportCode);
          return response.body;
        }
  ).catch(function (err) {
      console.log('Error is ' + JSON.stringify(err));
  });
};


JarvasWebdesignHelper.prototype.getAirportStatus = function(airportCode) {
   var options = {
      method: 'GET',
      uri: ENDPOINT + airportCode,
      resolveWithFullResponse: true,
      json: true
    };
  return rp(options);
};

JarvasWebdesignHelper.prototype.createNewBlog = function(airportCode) {
  var options = {
      method: 'POST',
      uri: 'https://public-api.wordpress.com/rest/v1.2/sites/82974409/posts/new/',
      headers: {
          'authorization': 'Bearer 7wbOTxM8l6X2Lqy7cFT(gRThK&Gr0CovQ9r2cBO9yiCXt5Tr#KTQ@hUGa2(Hfu^N',
          'User-Agent': 'Request-Promise'
      },
      form: {
          title: 'Hello World'
      },
      body: {
          some: 'payload'
      },
      resolveWithFullResponse: true,
      json: true
    };
  return rp(options);
};


JarvasWebdesignHelper.prototype.formatAirportStatus = function(airportStatus) {
  var weather = _.template('The current weather conditions are ${weather}, ${temp} and wind ${wind}.')({
      weather: airportStatus.weather.weather,
      temp: airportStatus.weather.temp,
      wind: airportStatus.weather.wind
    });
  if (airportStatus.delay === 'true') {
      var template = _.template('There is currently a delay for ${airport}. ' +
                                     'The average delay time is ${delay_time}. ' +
                                     'Delay is because of the following: ${delay_reason}. ${weather}');
      return template({
            airport: airportStatus.name,
            delay_time: airportStatus.status.avgDelay,
            delay_reason: airportStatus.status.reason,
            weather: weather
          });
    } else {
        //    no delay
        return _.template('There is currently no delay at ${airport}. ${weather}')({
          airport: airportStatus.name,
          weather: weather
        });
    }
 };
module.exports = JarvasWebdesignHelper;
