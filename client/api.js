import request from 'superagent'

export function getYoutubeResult () {
  return request
    .get('/api/v1/search/test/')
    .then(response => {
      return response.body.items
    })
}
