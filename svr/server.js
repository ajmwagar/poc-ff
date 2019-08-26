const express = require('express')
var LaunchDarkly = require('launchdarkly-node-server-sdk');

const app = express()
const port = 3001

const UserController = require('./routes/users/index')

var ldclient = LaunchDarkly.init('sdk-6203c9da-4d89-474d-9dc0-4c01345eb30b');

 ldclient.once('ready', function() {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });


  //Middleware to pass the client
  app.use(function(req, res, next) {
    res.locals.ldclient = ldclient
    next();
  });

  app.get('/', (req, res) => res.send('Hello World!'))
  app.use(express.json())
  app.use(UserController)

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

  // ldclient.flush(function() {
  //   ldclient.close();
  // });

})

ldclient.on('update:user-details', function(settings) {
  console.log('flags changed:', settings);
});