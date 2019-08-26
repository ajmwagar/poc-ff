const r = require('express').Router();
const UserDefault = require('./UserDefault')
const UserExtended = require('./UserExtended')

const UserRouter = r.use('/users', (req, res, next) => {
  console.log('User Router Entered')
  console.log('flags', req.flags)
  res.json((req.flags["user-details"]) ? UserExtended() : UserDefault())

  //res.json({"name":"somename"})

  res.end()
  next()
})

module.exports = UserRouter
