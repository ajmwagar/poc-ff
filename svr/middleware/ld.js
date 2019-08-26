//const express = require('express');
var LaunchDarkly = require('launchdarkly-node-server-sdk')


// request id middleware
const ldm = (req, res, next) => {
  console.log('ldm')
  
  let ldclient = LaunchDarkly.init("sdk-6203c9da-4d89-474d-9dc0-4c01345eb30b");

  let user = {
    "firstName":"AS",
    "lastName":"DAF",
    "key":"asdasdas@example.com",
    "custom":{
       "groups":"beta_testers"
    }
 };
 
  ldclient.waitForInitialization()
    .then( 
        ldclient.variation("user-details", user, false)
          .then( 
            showFeature => {
                req.flags = {"user-details": showFeature};
                ldclient.flush()
                  .then(
                    () => {
                          console.log('ld client flushed')
                          ldclient.close()
                    }
                  );
              next();
            },
            err => {console.log('Variation error', err)}
          )
      )
};


module.exports = ldm;