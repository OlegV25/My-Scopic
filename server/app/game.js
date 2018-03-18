import standart from './gameboard/standart.js'
const allCellIds = {}
Object.keys(standart).forEach(prop => {
  standart[prop].forEach(cell => {
    allCellIds[cell.id] = cell
  })
})
const game = (socket, io) => {
  let testObject = {
    totalPlayers: 2,
    moveOfPlayer: 0,
    players: [
      {name: 'Dima', id: 0, currentPostions: 0, gold: 200000, owns: {}},
      {name: 'My', id: 1, currentPostions: 0, gold: 200000, owns: {}}
    ]
  }
  const fillJournal = message => {
    io.sockets.emit('update history', message)
  }
  const submitBeforeBuy = () => {
    io.emit('submit before buy')
  }
  const changePlayer = () => {
    let { totalPlayers, players } = testObject
    testObject.moveOfPlayer++
    if (testObject.moveOfPlayer === totalPlayers) {
      testObject.moveOfPlayer = 0
    }
    fillJournal(`Move of player ${players[testObject.moveOfPlayer].name}`)
    io.emit('set tip position', testObject)
  }
  socket.on('submitted buy', isSubmitted => {
    if (isSubmitted) {
      let { players } = testObject
      let player = players[testObject.moveOfPlayer]
      let cell = allCellIds[player.currentPostions]
      player.gold -= cell.options.gold
      player.owns[player.currentPostions] = true
      fillJournal(`Player ${player.name} bought ${cell.text}`)
      fillJournal(`Player ${player.name} has new gold amount: ${player.gold}`)
    }
    changePlayer()
  })
  socket.on('prepare game', users => {
    io.emit('begin game', users)
  })
  socket.on('get players info', () => {
    io.emit('set players info', testObject)
  })
  socket.on('change tip position', () => {
    let { players } = testObject
    let player = players[testObject.moveOfPlayer]
    const random = 1 // Math.floor((Math.random() * 6) + 1)
    const maxId = standart.left[standart.left.length - 1].id
    player.currentPostions = player.currentPostions + random
    if (player.currentPostions > maxId) {
      player.currentPostions -= maxId + 1
      player.gold += 2000
      fillJournal(`Player ${player.name} has new gold amount: ${player.gold}`)
    }
    if (allCellIds[player.currentPostions].options) {
      const cell = allCellIds[player.currentPostions].options
      if (cell.type === 'bonus' || cell.type === 'chest') {
        player.gold += cell.gold
        fillJournal(`Player ${player.name} has new gold amount: ${player.gold}`)
      }
      if (cell.type === 'buy' && !players.some(i => i.owns[player.currentPostions])) {
        submitBeforeBuy()
        return false
      }
    }
    changePlayer()
  })
}

module.exports = game
