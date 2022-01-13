import React, { useEffect, useState } from 'react'
import { getYoutubeResult } from '../api'

function Youtube () {
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

  const video = youtubeResult[0]
  console.log(video)
  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default Youtube
