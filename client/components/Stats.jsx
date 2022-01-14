import React from 'react'
import YouTube from 'react-youtube'

function Stats (props) {
  const vidId = props.id

  return (
    <>
      <YouTube
        videoId={vidId}/>
    </>
  )
}

export default Stats
