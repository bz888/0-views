import React, { useState } from 'react'
import YouTube from 'react-youtube'
import Modal from './Modal'
import { AnimatePresence } from 'framer-motion'
import { useToggle } from '../context/toggleContext'

function VideoPlayer ({ id, toggle, setToggle, minView }) {
  const stringHeight = window.innerHeight.toString()
  const stringWidth = window.innerWidth.toString()
  const [player, setPlayer] = useState(null)
  const [modalOpen, setModalOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const { playerToggle, setPlayerToggle } = useToggle()
  function close () {
    setModalOpen(false)
    setPlayerToggle(true)
    player.playVideo()
  }

  const opts = {
    height: stringHeight,
    width: stringWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 1,
      mute: 1,
      enablejspai: 1
    }
  }
  function onReady (event) {
    setPlayer(event.target)
    console.log('initial log player: ', player)
    event.target.stopVideo()
    setTimeout(() => { setLoading(false) }, 3000)
  }

  function onPlay () {
    player.unMute()
  }

  function onEnd () {
    setToggle(!toggle)
    console.log('onEnd ', 'minView: ', minView, 'video id: ', id)
  }
  function onError () {
    setToggle(!toggle)
    console.log('onError ', 'minView: ', minView, 'video id: ', id)
  }

  return (
    <>
      <AnimatePresence
        initial={true}
        exitBeforeEnter={true}
      >
        {
          modalOpen && <Modal modalOpen={modalOpen} handleClose={close} text={'After New Media'} load={loading}/>
        }
      </AnimatePresence>

      <div className='yt-player'>
        <YouTube
          videoId={id}
          opts={opts}
          onEnd={onEnd}
          onPlay={onPlay}
          onReady={playerToggle ? (event) => { setPlayer(() => event.target) } : onReady}
          onError={onError}
        />
      </div>
    </>
  )
}

export default VideoPlayer
