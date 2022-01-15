const express = require('express')
// const request = require('superagent')
require('dotenv').config()
const router = express.Router()
const { google } = require('googleapis')
const moment = require('moment')

// const apiKey = process.env.API_KEY
const apiKey2 = process.env.API_KEY2
// const date = new Date()
const pastDate = moment().subtract(1, 'hour').format()

console.log('10mins ago: ', pastDate)
// const stringDate = date.toISOString()

// using googleapis
router.get('/test', (req, res) => {
  google.youtube('v3').search.list({
    key: apiKey2,
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    publishedAfter: pastDate,
    order: 'date',
    videoEmbeddable: 'true'
  }).then(response => {
    res.json(response.data)
    return null
  }).catch(err => {
    res.status(500).json({ error: err.message })
  })
})

router.get('/test/statistics/:id', (req, res) => {
  const testId = req.params.id
  console.log(testId)
  google.youtube('v3').videos.list({
    key: apiKey2,
    id: testId,
    part: 'statistics'
  }).then(response => {
    res.json(response.data)
    return null
  }).catch(err => {
    res.status(500).json({ error: err.message })
  })
})

// GET /api/v1/search using superagent
// const url = {
//   baseURL: 'https://youtube.googleapis.com/youtube/v3/search?part=',
//   snippet: 'snippet',
//   maxResults: '&maxResults=1',
//   order: '&order=searchSortUnspecified',
//   publishedAfter: '&publishedAfter=' + stringDate,
//   key: '&key=' + apiKey
// }

// router.get('/', (req, res) => {
//   request.get(url.baseURL + url.snippet + url.maxResults + url.order + url.publishedAfter + url.key)
//     .then(response => {
//       res.json(response.body)
//       console.log(response.body)
//       return null
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message })
//     })
// })

module.exports = router
