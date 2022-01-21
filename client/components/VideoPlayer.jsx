import React, { useState } from 'react'
import YouTube from 'react-youtube'
import Modal from './Modal'
import { AnimatePresence } from 'framer-motion'

// import useWindowDimensions from './useWindow'

function VideoPlayer ({ id, toggle, setToggle, minView }) {
  // const { height, width } = useWindowDimensions

  const stringHeight = window.innerHeight.toString()
  const stringWidth = window.innerWidth.toString()
  const [player, setPlayer] = useState(null)
  const [modalOpen, setModalOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  function close () {
    setModalOpen(false)
    player.playVideo()
    player.requestFullscreen()
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
    // setModalOpen(true)
    setTimeout(setLoading(false), 10000)
    console.log('video ready', loading)
  }

  function onPlay () {
    player.unMute()
  }

  function onEnd () {
    setToggle(!toggle)
    console.log('ping, reRender page')
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
