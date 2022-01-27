const express = require('express')
require('dotenv').config()
const router = express.Router()
const { google } = require('googleapis')

const apiKey = process.env.API_KEY
const apiKey2 = process.env.API_KEY2
const apiKey3 = process.env.API_KEY3
const apiArr = [apiKey, apiKey2, apiKey3]

let keyIdx = 0

// using googleapis
router.get('/test/:tag', (req, res) => {
  const tagNum = req.params.tag
  function toggleDuration (tag) {
    const splitArr = tag.split(' ')
    const int = parseInt(splitArr[1])
    if (int >= 200) {
      return 'short'
    } else {
      return 'medium'
    }
  }
  const durationParam = toggleDuration(tagNum)

  const useKey = apiArr[keyIdx]

  google.youtube('v3').search.list({
    key: useKey,
    part: 'snippet',
    type: 'video',
    q: tagNum,
    maxResults: 50,
    videoEmbeddable: 'true',
    videoDuration: durationParam
  }).then(response => {
    res.json(response.data)
    console.log('useKey accepted: ', useKey)
    return null
  }).catch(err => {
    console.log('you fucked up bad : ', err.message)
    keyIdx++
    console.log('keyidx: ', keyIdx)
    console.log('useKey: ', useKey)
    res.status(500).json({ error: err.message })
  })
})

router.get('/test/statistics/:id', (req, res) => {
  const testId = req.params.id

  const useKey = apiArr[keyIdx]

  google.youtube('v3').videos.list({
    key: useKey,
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
