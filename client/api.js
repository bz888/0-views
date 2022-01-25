import request from 'superagent'

export function getYoutubeResult ({ tag, length }) {
  console.log('api ping', tag, length)
  return request
    .get(`/api/v1/search/test/${tag}/${length}`)
    .then(response => {
      return response.body.items
    })
}
export function getStatistics (id) {
  return request
    .get(`/api/v1/search/test/statistics/${id}`)
    .then(response => {
      return response.body
    })
}
