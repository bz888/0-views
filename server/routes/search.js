const express = require('express')
const request = require('superagent')
require('dotenv').config()
const router = express.Router()
const { google } = require('googleapis')

const apiKey = process.env.API_KEY
const date = new Date()
const stringDate = date.toISOString()

// using googleapis
router.get('/test', (req, res) => {
  google.youtube('v3').search.list({
    key: apiKey,
    part: 'snippet',
    type: 'video',
    maxResults: 1,
    publishedAfter: stringDate,
    order: 'date'
  }).then(response => {
    res.json(response.data)
    console.log(response.data)
    return null
  }).catch(err => {
    res.status(500).json({ error: err.message })
  })
})

// GET /api/v1/search using superagent
const url = {
  baseURL: 'https://youtube.googleapis.com/youtube/v3/search?part=',
  snippet: 'snippet',
  maxResults: '&maxResults=1',
  order: '&order=searchSortUnspecified',
  publishedAfter: '&publishedAfter=' + stringDate,
  key: '&key=' + apiKey
}

router.get('/', (req, res) => {
  request.get(url.baseURL + url.snippet + url.maxResults + url.order + url.publishedAfter + url.key)
    .then(response => {
      res.json(response.body)
      console.log(response.body)
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
