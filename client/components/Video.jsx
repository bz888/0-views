import React, { useEffect, useState } from 'react'

import { getStatistics, getYoutubeResult } from '../api'

import Stats from './Stats'

function Video () {
  const [vidId, setVidId] = useState([])
  const [toggle, setToggle] = useState(true)
  const [index, setIndex] = useState('')
  const [minView, setMinView] = useState('')

  useEffect(() => {
    search()
  }, [toggle])

  function search () {
    getYoutubeResult()
      .then((resultData) => {
        console.log('result data: ', resultData)
        const idArray = resultData.map(item => item.id.videoId)
        console.log('idArray: ', idArray)
        setVidId(idArray)
        return idArray
      })
      .then((id) => {
        console.log('ids', id)
        return getStatistics(id)
      })
      .then((data) => {
        const viewArray = data.items.map(ele => ele.statistics.viewCount)
        console.log('viewArray: ', viewArray)
        const minViews = Math.min(...viewArray)
        console.log('minViews: ', minViews)
        setMinView(minViews)
        const idx = viewArray.indexOf(minViews.toString())
        console.log('idx: ', idx)
        setIndex(idx)
        return null
      })
      .catch(err => console.error(err))
  }

  console.log('outside callback vidId: ', vidId[index])

  return (
    <>
      <Stats id={vidId[index]} setToggle={setToggle} toggle={toggle} minView={minView}/>
    </>
  )
}

export default Video
