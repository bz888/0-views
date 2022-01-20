import React, { useState } from 'react'
import YouTube from 'react-youtube'

function VideoPlayer ({ id, toggle, setToggle, minView }) {
  const [player, setPlayer] = useState(null)

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      mute: 1
    }
  }
  function onReady (event) {
    setPlayer(event.target)
  }

  function handleClick () {
    player.playVideo()
    console.log(player.isMuted())
  }
  function onPlay () {
    player.unMute()
  }

  function onEnd () {
    setToggle(!toggle)
    console.log('ping, reRender page')
  }

  console.log('stats id: ', id)
  console.log('settoggle func', toggle)

  return (
    <>
      {/* <h1 className='viewCount'>View Count: {minView}</h1> */}
      <button className='pageEntrance' onClick={handleClick}>Go</button>
      <div className='yt-player'>
        <YouTube
          videoId={id}
          opts={opts}
          onEnd={onEnd}
          onPlay={onPlay}
          onReady={onReady}
        />
      </div>
    </>
  )
}

export default VideoPlayer
