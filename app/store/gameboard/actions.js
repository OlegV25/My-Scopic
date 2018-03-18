import { gameboardService } from 'project-services'
import * as types from './actionTypes'
import io from 'socket.io-client'
const socket = io('http://localhost:8080')

export const listenerOnJournalChanges = () => {
  return dispatch => {
    // .to('LONG_SESSION_NAME')
    socket.on('update history', playerHistory => {
      dispatch({ type: types.UPDATE_PLAYER_HISTORY, payload: {playerHistory} })
    })
  }
}
export const listenerOnNewTipPosition = () => {
  return dispatch => {
    socket.on('set tip position', gameInfo => {
      dispatch({ type: types.GET_PLAYERS_SUCCESS, payload: {gameInfo} })
    })
  }
}
export const listenerOnConfirmationBeforeBuy = () => {
  return dispatch => {
    try {
      socket.on('submit before buy', () => {
        dispatch({ type: types.GET_CONFIRMATION_BEFORE_BUY_SUCCESS, payload: {isSubmitRequired: true} })
      })
    } catch (err) {
      dispatch({ type: types.GET_CONFIRMATION_BEFORE_BUY_SUCCESS, payload: {isSubmitRequired: false} })
    }
  }
}
export const getGameboard = () => {
  return dispatch => {
    return new Promise(resolve => {
      try {
        dispatch({ type: types.GET_STANDART_GAMEBOARD })
        gameboardService().then(gameboard => {
          dispatch({ type: types.GET_STANDART_GAMEBOARD_SUCCESS, payload: {gameboard} })
          resolve()
        })
      } catch (err) {
        dispatch({ type: types.GET_STANDART_GAMEBOARD_ERROR })
        resolve()
      }
    })
  }
}
export const getPlayers = () => {
  return dispatch => {
    return new Promise(() => {
      try {
        socket.on('set players info', gameInfo => {
          dispatch({ type: types.GET_PLAYERS_SUCCESS, payload: {gameInfo} })
        })
        dispatch({ type: types.GET_PLAYERS })
        socket.emit('get players info')
      } catch (err) {
        dispatch({ type: types.GET_PLAYERS_ERROR })
      }
    })
  }
}
export const changeTipPositions = () => {
  return dispatch => {
    return new Promise(() => {
      try {
        dispatch({ type: types.GET_PLAYERS })
        socket.emit('change tip position')
      } catch (err) {
        dispatch({ type: types.GET_PLAYERS_ERROR })
      }
    })
  }
}
export const submitBuy = isSubmitted => {
  return dispatch => {
    try {
      socket.emit('submitted buy', isSubmitted)
      dispatch({ type: types.GET_CONFIRMATION_BEFORE_BUY_SUCCESS, payload: {isSubmitRequired: false} })
    } catch (err) {
      dispatch({ type: types.GET_CONFIRMATION_BEFORE_BUY_SUCCESS, payload: {isSubmitRequired: false} })
    }
  }
}
