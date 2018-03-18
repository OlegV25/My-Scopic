var exports = module.exports = {}

exports.init = function (socket, io, gameInfo) {
  socket.on('create game', function (info) {
    gameInfo.listOfGames.push(info)
  })
}
