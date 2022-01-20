import React, { useEffect, useState } from 'react'

import { getStatistics, getYoutubeResult } from '../api'

import VideoPlayer from './VideoPlayer'

function GetVid () {
  const [vidId, setVidId] = useState([])
  const [toggle, setToggle] = useState(true)
  const [index, setIndex] = useState('')
  const [minView, setMinView] = useState('')

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
        setMinView(minViews)
        const idx = viewArray.indexOf(minViews.toString())
        setIndex(idx)
        return minViews === 0 ? null : setToggle(!toggle)
      })
      .catch(err => console.error(err))
  }
  // console.log('outside callback vidId: ', vidId[index])

  return (
    <>

      <VideoPlayer id={vidId[index]} setToggle={setToggle} toggle={toggle} minView={minView}/>
    </>
  )
}

export default GetVid
