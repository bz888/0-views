import React, { useState } from 'react'
import YouTube from 'react-youtube'

function Stats ({ id, toggle, setToggle, minView }) {
  const [player, setPlayer] = useState()
  // const [currentId, setCurrentId] = useState()

  function onEnd () {
    // if (id === currentId) {
    setToggle(!toggle)
    // }da
  }

  function onReady (event) {
    setPlayer(event.target)
    // setCurrentId(id)
  }
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 1,
      mute: 1
    }
  }
  console.log('stats id: ', id)
  console.log('settoggle func', toggle)

  return (
    <>
      <h1 className='viewCount'>View Count: {minView}</h1>
      <YouTube
        className='yt-player'
        videoId={id}
        opts={opts}
        onEnd={onEnd}
        onReady={onReady}
      />
    </>
  )
}

export default Stats
