import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
  gameboard: { top: [], right: [], bottom: [], left: [] },
  gameInfo: { players: [] },
  gameboardFetching: false,
  isSubmitRequired: false,
  playerHistory: []
})

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.GET_STANDART_GAMEBOARD:
    return state.merge({
      gameboardFetching: true
    })
  case types.GET_STANDART_GAMEBOARD_SUCCESS:
    return state.merge({
      gameboard: action.payload.gameboard,
      gameboardFetching: false
    })
  case types.GET_STANDART_GAMEBOARD_ERROR:
    return state.merge({
      gameboard: { top: [], right: [], bottom: [], left: [] }
    })

  case types.UPDATE_PLAYER_HISTORY:
    return state.merge({
      playerHistory: [...state.playerHistory, action.payload.playerHistory]
    })

  case types.GET_PLAYERS_SUCCESS:
    return state.merge({
      gameInfo: action.payload.gameInfo
    })
  case types.GET_PLAYERS_ERROR:
    return state.merge({
      gameInfo: { }
    })

  case types.GET_CONFIRMATION_BEFORE_BUY_SUCCESS:
    return state.merge({
      isSubmitRequired: action.payload.isSubmitRequired
    })

  default:
    return state
  }
}
