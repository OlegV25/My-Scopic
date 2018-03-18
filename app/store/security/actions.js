import { securityService } from 'project-services'
import * as types from './actionTypes'

export const getMy = body => {
  return dispatch => {
    return new Promise(resolve => {
      try {
        dispatch({ type: types.SECURITY_GET_MY })
        securityService.login(body).then(myUser => {
          dispatch({ type: types.SECURITY_GET_MY_SUCCESS, payload: {myUser} })
          resolve()
        })
      } catch (err) {
        dispatch({ type: types.SECURITY_GET_MY_ERROR, payload: {myUser: {}} })
        resolve()
      }
    })
  }
}
