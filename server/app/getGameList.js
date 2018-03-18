var exports = module.exports = {}

exports.init = function (socket, io, gameInfo) {
  socket.on('get info game list', function () {
    io.emit('game list', gameInfo.listOfGames)
  })
  socket.on('delete game from list', function (arr) {
    gameInfo.listOfGames = arr
  })
}
