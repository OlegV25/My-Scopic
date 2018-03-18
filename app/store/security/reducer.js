import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
  myUser: JSON.parse(localStorage.getItem('myUser')) || {},
  myUserFetching: false
})

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.SECURITY_GET_MY:
    return state.merge({
      myUserFetching: false
    })
  case types.SECURITY_GET_MY_SUCCESS:
    return state.merge({
      myUser: action.payload.myUser,
      myUserFetching: false
    })
  case types.SECURITY_GET_MY_ERROR:
    return state.merge({
      myUserFetching: false,
      myUser: {}
    })
  default:
    return state
  }
}
