import React from 'react'
import YouTube from 'react-youtube'

function Stats ({ id, toggle, setToggle }) {
  function onEnd () {
    setToggle(!toggle)
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

  function handleChange () {
    console.log(1)
  }

  return (

    <>
      <button onClick={handleChange}>interact</button>  {/* testButton */}

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
