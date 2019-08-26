//const express = require('express');
var LaunchDarkly = require("launchdarkly-node-server-sdk");

// request id middleware
const ldm = flagName => {
  return (req, res, next) => {
    let ldclient = LaunchDarkly.init(
      "sdk-6203c9da-4d89-474d-9dc0-4c01345eb30b"
    );

    let user = {
      firstName: "AS",
      lastName: "DAF",
      key: "asdasdas@example.com",
      custom: {
        groups: "beta_testers"
      }
    };

    ldclient.once("ready", function() {
      ldclient.variation(flagName, user, false, function(err, showFeature) {
        req.flags = {
          ...req.flags,
          [flagName]: showFeature
        };
        console.log(req.flags);

        ldclient.flush(function() {
          ldclient.close();
        });

        next();
      });
    });
  };
};

module.exports = ldm;
