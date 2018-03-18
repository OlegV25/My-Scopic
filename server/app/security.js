// var passport = require('passport')
// var Strategy = require('passport-local').Strategy
import db from './db'
const findUser = (username, password, cb) => {
  db.users.findByUsername(username, (err, user) => {
    if (err) { return cb(false) }
    if (!user) { return cb(false) }
    if (user.password !== password) { return cb(false) }
    return cb(user)
  })
}
module.exports = app => {
  app.post('/login', (req, res) => {
    const cb = user => { user ? res.send(user) : {error: true} }
    findUser(req.body.username, req.body.password, cb)
  })
  app.get('/auth', (req, res) => {
    res.send(true)
  })
}
