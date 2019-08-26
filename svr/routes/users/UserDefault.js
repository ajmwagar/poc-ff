
var router = require('express').Router();

router.get('/users', function(req, res, next) {
  res.json({
    name: "Bungalo Bill!!!!!"
  })
});

module.exports = router
