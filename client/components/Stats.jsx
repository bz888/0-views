import React from 'react'
import YouTube from 'react-youtube'

function Stats (props) {
  function getNextVideo (event) {
    console.log(event.target)
  }

  function playVideo (event) {
    const player = event.target
    console.log(player)
  }
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
  const vidId = props.id

  function handleChange () {
    console.log(1)
  }

  return (

    <>
      <button onClick={handleChange}>interact</button>
      <YouTube
        videoId={vidId}
        opts={opts}
        onReady={playVideo}
        onEnd={getNextVideo}
      />
    </>
  )
}

export default Stats
