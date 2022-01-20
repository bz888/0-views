import React from 'react'
import YouTube from 'react-youtube'

function Stats ({ id, toggle, setToggle, minView }) {
  function onEnd () {
    setToggle(!toggle)
    console.log('ping, reRender page')
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
      />
    </>
  )
}

export default Stats
