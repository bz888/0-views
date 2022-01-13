import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { getStatistics } from '../api'

function Stats (props) {
  const vidId = props.id
  const [views, setViews] = useState([])
  const [toggle, setToggle] = useState(true)
  useEffect(() => {
    getStatistics(vidId)
      .then(data => {
        console.log('views data: ', data)
        setViews(data.items)
        return null
      })
      .catch(err => console.error(err))
  }, [toggle])

  return (
    <>
      <h1>Stats</h1>
      <YouTube
        videoId={vidId}/>
    </>
  )
}

export default Stats
