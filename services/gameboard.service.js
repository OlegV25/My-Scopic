import mainRequestService from './request.service'
export default () => {
  const url = 'http://localhost:8080/gameboard/standart'
  const options = {
    method: 'GET'
  }
  return mainRequestService(url, options)
}
