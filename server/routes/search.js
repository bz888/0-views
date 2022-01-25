const express = require('express')
require('dotenv').config()
const router = express.Router()
const { google } = require('googleapis')

const apiKey = process.env.API_KEY
// const apiKey2 = process.env.API_KEY2

// function randomNum (max, min) {
//   const num = Math.floor(Math.random() * (max - min) + min)
//   return num
// }

// using googleapis
router.get('/test/:tag', (req, res) => {
  const tagNum = req.params.tag
  // const durationParam = req.params.duration

  // const randomDuration = randomNum(1, 0)
  // const durationArr = ['short', 'medium']
  // const durationParam = durationArr[randomDuration]
  // console.log('duration Param, search.js: ', durationParam)

  const date = new Date()
  console.log('req.params', date, req.params)

  google.youtube('v3').search.list({
    key: apiKey,
    part: 'snippet',
    type: 'video',
    q: tagNum,
    maxResults: 50,
    videoEmbeddable: 'true',
    videoDuration: 'medium'
  }).then(response => {
    // console.log('response data, search.js: ', response.data)
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
