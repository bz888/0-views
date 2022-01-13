import React, { useEffect, useState } from 'react'
import { getYoutubeResult } from '../api'
import YouTube from 'react-youtube'

function Video () {
  const [youtubeResult, setYoutubeResult] = useState([])
  useEffect(() => {
    getYoutubeResult()
      .then(ele => {
        // console.log(ele)
        return ele
      })
      .then((resultData) => {
        console.log('result data: ', resultData)
        setYoutubeResult(resultData)
        return null
      })
      .catch(err => console.error(err))
  }, [])

  const result = youtubeResult.map(item => item.id.videoId)
  console.log(result)
  return (
    <>
      <h1>video component</h1>
      <YouTube
        videoId={result}/>
    </>
  )
}

export default Video
