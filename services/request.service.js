const mainRequestService = (url, options) => fetch(url, options).then(r => {
  if (r.status === 503) setTimeout(() => { mainRequestService(url, options) }, r.headers.get('Retry-After') * 1000)
  if (r.status === 200) {
    return r.json()
  }
}).catch(r => { alert(r.message) })
export default mainRequestService
