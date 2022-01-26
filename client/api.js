import request from 'superagent'

export function getYoutubeResult ({ tag, duration }) {
  return request
    .get(`/api/v1/search/test/${tag}/${duration}`)
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
