import React, { useState } from 'react'
import YouTube from 'react-youtube'
import Modal from './Modal'
import { AnimatePresence } from 'framer-motion'

function VideoPlayer ({ id, toggle, setToggle, minView }) {
  const [player, setPlayer] = useState(null)
  const [modalOpen, setModalOpen] = useState(true)
  function close () {
    setModalOpen(false)
    player.playVideo()
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
  function onReady (event) {
    setPlayer(event.target)
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
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
      >
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} text={'begin'}/>}
      </AnimatePresence>

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
