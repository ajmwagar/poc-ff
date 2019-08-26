// var LaunchDarkly = require('launchdarkly-node-server-sdk');
// var ldclient = LaunchDarkly.init('sdk-6203c9da-4d89-474d-9dc0-4c01345eb30b');

var UserDefault = require('./UserDefault')
var UserExtended = require('./UserExtended')

// const flag = false
var user = {
  firstName: 'Bob',
  lastName: 'Loblaw',
  key: 'user_key',
  custom: {
    groups: 'beta_testers'
  }
};

var router = require('express').Router();

router.use('/users', function(req, res, next) {


  res.locals.ldclient.variation('user-details', user, false, function(err, showFeature) {
    if (showFeature) {
      console.log('UserExtended')
      router.use(UserExtended)
      next()
    } else {
      console.log('UserDefault')
      router.use(UserDefault)
      next()
    }
  });
});

module.exports = router
