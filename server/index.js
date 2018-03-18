import routes from './app/routes.js'
import socketio from 'socket.io'
import chat from './app/chat.js'
import game from './app/game.js'
import express from 'express'
import http from 'http'

const app = express()
const server = http.Server(app)
const io = socketio(server)
const port = 8080

app.use(express.static(__dirname))
routes(app)
io.on('connection', socket => {
  chat(socket, io)
  game(socket, io)
  // require('./app/createGame.js').init(socket, io, gameInfo)
  // require('./app/getGameList.js').init(socket, io, gameInfo)
})
console.log('Running')
server.listen(port)
