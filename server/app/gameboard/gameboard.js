var obj = require('./standart.js')
const dashboardServer = app => {
  app.get('/gameboard/standart', (req, res) => {
    res.send(obj)
  })
}
module.exports = dashboardServer
