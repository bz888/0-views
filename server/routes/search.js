const express = require('express')
const request = require('superagent')
require('dotenv').config()
const router = express.Router()

const apiKey = process.env.API_KEY
const youtubeURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&key='

// GET /api/v1/search
router.get('/', (req, res) => {
  request.get(youtubeURL + apiKey)
    .then(response => {
      res.json(response.body)
      console.log(response.body);
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
