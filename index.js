/*********************************************************************************
*     File Name           :     index.js
*     Created By          :     shivam.gupta
*     Creation Date       :     [2016-09-09 16:19]
*     Last Modified       :     [2016-09-10 16:11]
*     Description         :      
**********************************************************************************/

'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('webdesign');
var JarvasWebdesignHelper = require('./jarvas_webdesign_helper');

app.launch(function(req, res) {
  var prompt = 'Tell me what to update like images, fonts, background';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});
//MYCOMMAND - update|change|modify|shift
//MYMODIFIEE - text, font, image, 
//color - red,green,blue,black,yellow,grey
//image - fruit,vegetable,scenary
//font - arabic, italic
app.intent('webdesign', {
 'slots': {
     'COMMAND': 'MYCOMMAND',
     'MODIFIEE': 'MYMODIFIEE',
     'PREVSTATE': 'AMAZON.LITERAL',
     'UPDATESTATE': 'AMAZON.LITERAL'
   },
  'utterances': ['{|please} {-|COMMAND} {|the} {-|MODIFIEE} {from|} {-|PREVSTATE} {to} {-|UPDATESTATE}']
},
  function(req, res) {
    var command = req.slot('COMMAND');
    var modifiee = req.slot('MODIFIEE');
    var prevState = req.slot('PREVSTATE');
    var updateState = req.slot('UPDATESTATE');
    var reprompt = 'Please tell me what to update like images, fonts, background etc. I have some other important works to finish';
    var webdesignHelper = new JarvasWebdesignHelper();
    var SUCCESSFUL_MESSAGE = " all hail jarvas";
    console.log("Request received " + command + " " + modifiee + " " + prevState + " " + updateState);
    if (_.isEmpty(command)) {
      var prompt = 'I didn\'t hear proper command to do. Tell me properly what to do like update, shift etc otherwise you might loose this hackathon';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } /*else if (_.isEmpty(modifiee)){
      var prompt = 'I didn\'t hear properly what to modify. Tell me something like text, font, image, date etc to modify';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else if (_.isEmpty(newColor)) {
      var prompt = 'I am asking you last time what exactly you want;
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } */else {
      debugger;
      webdesignHelper.updateWebsite(modifiee, prevState, updateState).then(function(bodyResponse){
          console.log(bodyResponse + SUCCESSFUL_MESSAGE);
          res.say(bodyResponse + SUCCESSFUL_MESSAGE).send();
      }).catch(function(err) {
              console.log(err);
              var prompt = 'I didn\'t hear proper command to do. Tell me properly what to do like update, shift etc otherwise you might loose this hackathon';
              res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });  
      console.log("Done with processing"); 
      return false;
    }
  }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
  return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
