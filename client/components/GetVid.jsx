import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import Modal from './Modal'
import { AnimatePresence } from 'framer-motion'
import { useToggle } from '../context/toggleContext'
import { getStatistics, getYoutubeResult } from '../api'

// import VideoPlayer from './VideoPlayer'

function GetVid () {
  const [vidId, setVidId] = useState([])
  const [toggle, setToggle] = useState(true)
  const [index, setIndex] = useState('')
  // const [minView, setMinView] = useState('')

  const [player, setPlayer] = useState(null)
  const [modalOpen, setModalOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  const { playerToggle, setPlayerToggle } = useToggle()

  useEffect(() => {
    search()
  }, [toggle])

  function pad (num, size) {
    let s = num + ''
    while (s.length < size) s = '0' + s
    return s
  }

  function randomNum (max, min) {
    const num = Math.floor(Math.random() * (max - min) + min)
    return num
  }

  function search () {
    const randomTag = randomNum(800, 1)
    const tagNum = pad(randomTag, 4)
    const tagName = ['DSC ', 'MOV ', 'IMG ']
    const idxName = randomNum(2, 0)
    const searchTag = tagName[idxName] + tagNum
    // console.log('searchTag: ', searchTag)

    getYoutubeResult(searchTag)
      .then((resultData) => {
        const idArray = resultData.map(item => item.id.videoId)
        setVidId(idArray)
        return idArray
      })
      .then((id) => {
        return getStatistics(id)
      })
      .then((data) => {
        const viewArray = data.items.map(ele => ele.statistics.viewCount)
        const minViews = Math.min(...viewArray)
        // setMinView(minViews)
        const idx = viewArray.indexOf(minViews.toString())
        setIndex(idx)
        return minViews === 0 ? null : setToggle(!toggle)
      })
      .catch(err => console.error(err))
  }

  const stringHeight = window.innerHeight.toString()
  const stringWidth = window.innerWidth.toString()

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
      controls: 0,
      mute: 1,
      enablejspai: 1
    }
  }
  function onReady (event) {
    setPlayer(event.target)
    event.target.stopVideo()
    setTimeout(() => { setLoading(false) }, 3000)
  }

  function onPlay () {
    player.unMute()
  }

  return (
    <>
      {/* <VideoPlayer id={vidId[index]} setToggle={setToggle} toggle={toggle} minView={minView}/> */}
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
          videoId={vidId[index]}
          opts={opts}
          onEnd={() => { setToggle(() => !toggle) }}
          onPlay={onPlay}
          onReady={playerToggle ? (event) => { setPlayer(() => event.target) } : onReady}
          onError={() => { setToggle(() => !toggle) }}
        />
      </div>
    </>
  )
}

export default GetVid
