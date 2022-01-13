import React, { useEffect, useState } from 'react'
import { getYoutubeResult } from '../api'

import Stats from './Stats'

function Video () {
  const [youtubeResult, setYoutubeResult] = useState([])
  useEffect(() => {
    getYoutubeResult()
      .then((resultData) => {
        console.log('result data: ', resultData)
        setYoutubeResult(resultData)
        return null
      })
      .catch(err => console.error(err))
  }, [])
  // create function that finds viewcount and returns if 0
  // find viewcount of video,
  // use the output as const result
  // else if, ping youtubeapi again but with different date

  const result = youtubeResult.map(item => item.id.videoId)
  console.log(result)
  return (
    <>
      <h1>video component</h1>
      <Stats id={result}/>
    </>
  )
}

export default Video
