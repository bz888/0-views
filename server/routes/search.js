const express = require('express')
require('dotenv').config()
const router = express.Router()
const { google } = require('googleapis')

const apiKey = process.env.API_KEY
// const apiKey2 = process.env.API_KEY2

// using googleapis
router.get('/test/:tag/:length', (req, res) => {
  const tagNum = req.params.tag
  console.log('req.params.tag: ', req.params.tag)
  console.log('req.params.length: ', req.params.length)
  google.youtube('v3').search.list({
    key: apiKey,
    part: 'snippet',
    type: 'video',
    q: tagNum,
    maxResults: 50,
    videoEmbeddable: 'true',
    videoDuration: 'medium'
  }).then(response => {
    res.json(response.data)
    return null
  }).catch(err => {
    res.status(500).json({ error: err.message })
  })
})

router.get('/test/statistics/:id', (req, res) => {
  const testId = req.params.id
  google.youtube('v3').videos.list({
    key: apiKey,
    id: testId,
    part: 'statistics'
  }).then(response => {
    res.json(response.data)
    return null
  }).catch(err => {
    res.status(500).json({ error: err.message })
  })
})

module.exports = router
