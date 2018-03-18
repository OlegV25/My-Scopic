import mainRequestService from './request.service'
export const login = body => {
  const url = 'http://localhost:8080/login'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  return mainRequestService(url, options)
}
export const isAuthenticated = () => {
  const url = 'http://localhost:8080/auth'
  const options = {
    method: 'GET'
  }
  return mainRequestService(url, options)
}

export default {
  login
}
