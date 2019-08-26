//const express = require('express');
var LaunchDarkly = require('launchdarkly-node-server-sdk')


// request id middleware
const ldm = (req, res, next) => {
  console.log('ldm')
  
  let ldclient = LaunchDarkly.init("sdk-6203c9da-4d89-474d-9dc0-4c01345eb30b");

  
  const setFlag = (flag, user) => {
    ldclient.variation(flag, user, false, function(err, showFeature) {
      req.flags = {[flag]: showFeature};
    })
  }

  let user = {
    "firstName":"AS",
    "lastName":"DAF",
    "key":"asdasdas@example.com",
    "custom":{
       "groups":"beta_testers"
    }
 };
 
  ldclient.once('ready', function() {
    ldclient.variation("user-details", user, false, function(err, showFeature) {
      req.flags = {"user-details": showFeature};


      ldclient.flush(function() {
        console.log('ld client flushed')
        ldclient.close();
      });
  
      next();
    });


  });
};


module.exports = ldm;