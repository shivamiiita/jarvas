/*********************************************************************************
*     File Name           :     jarvas_webdesign_helper.js
*     Created By          :     shivam.gupta
*     Creation Date       :     [2016-09-09 13:44]
*     Last Modified       :     [2016-09-10 16:08]
*     rization: Bearer 7wbOTxM8l6X2Lqy7cFT(gRThK&Gr0CovQ9r2cBO9yiCXt5Tr#KTQ@hUGa2(Hfu^N' \
*
*     Description         :      
**********************************************************************************/

'use strict'

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://54.169.212.81:9050/api/updateWebsite';

function JarvasWebdesignHelper() {}

JarvasWebdesignHelper.prototype.updateWebsite = function(modifiee, prevState, updateState) {
  console.log('updating ' + modifiee + " from " + prevState + " " + updateState);
  console.log("Returning from call");
  return this.updateWebsiteAPI(modifiee, updateState).then(
    function(response) {
          console.log('success - requested to modify website for ' + JSON.stringify(response));
          return response.body.message;
        }
  ).catch(function (err) {
         console.log('Error is ' + JSON.stringify(err));
         return err.message;
  });
};

JarvasWebdesignHelper.prototype.updateWebsiteAPI = function(action, updateState) {
  var options = {
      method: 'POST',
      uri: ENDPOINT,
      form: {
          action: action,
          [action] : updateState
      },
      resolveWithFullResponse: true,
      json: true
    };
  console.log(JSON.stringify(options));  
  return rp(options);
};


JarvasWebdesignHelper.prototype.formatAirportStatus = function(isFailed, action, prevState, updateState) {
  var weather = _.template('Updated ${action} to ${updateState}. Let me know anything else you want to change')({
      action: action,
      updateState: updateState
    });
  if (isFailed === 'true') {
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
