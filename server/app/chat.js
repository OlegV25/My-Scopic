const chat = (socket, io) => {
  socket.broadcast.emit('user connected')
  socket.on('chat message', (msg, user) => {
    io.emit('chat message', msg, user)
  })
  socket.on('disconnect', () => {
    io.emit('user disconnect')
  })
}

module.exports = chat
