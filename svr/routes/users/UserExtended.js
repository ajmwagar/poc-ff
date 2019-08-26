
var router = require('express').Router();

router.get('/users', function(req, res, next) {
  res.json({
    name: "Bungalo Bill",
    role: "admin",
    id: "UNIQUE_KEY",
    email: "someguy@google.com"
  })
});

module.exports = router
