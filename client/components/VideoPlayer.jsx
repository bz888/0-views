import React, { useState } from 'react'
import YouTube from 'react-youtube'
import Modal from './Modal'
import { AnimatePresence } from 'framer-motion'

function VideoPlayer ({ id, toggle, setToggle }) {
  const stringHeight = window.innerHeight.toString()
  const stringWidth = window.innerWidth.toString()
  const [player, setPlayer] = useState(null)
  const [modalOpen, setModalOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  function close () {
    setModalOpen(false)
    player.playVideo()
  }

  const opts = {
    height: stringHeight,
    width: stringWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      mute: 1,
      enablejspai: 1
    }
  }
  function onReady (event) {
    setPlayer(event.target)
    setTimeout(() => { setLoading(false) }, 3000)
  }

  function onPlay () {
    player.unMute()
  }

  function onEnd () {
    setToggle(!toggle)
  }

  return (
    <>
      <AnimatePresence
        initial={true}
        exitBeforeEnter={true}
      >
        {
          modalOpen && <Modal modalOpen={modalOpen} handleClose={close} text={'begin'} load={loading}/>
        }
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
