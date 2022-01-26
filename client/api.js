import request from 'superagent'

export function getYoutubeResult (tag) {
  return request
    .get(`/api/v1/search/test/${tag}`)
    .retry(2)
    .then(response => {
      return response.body.items
    })
}
export function getStatistics (id) {
  return request
    .get(`/api/v1/search/test/statistics/${id}`)
    .retry(2)
    .then(response => {
      return response.body
    })
}
