import request from 'superagent'

export function getYoutubeResult (tag) {
  return request
    .get(`/api/v1/search/test/${tag}`)
    .then(response => {
      // console.log(response.body)
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
