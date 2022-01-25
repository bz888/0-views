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

  function generateParams () {
    const randomTag = randomNum(800, 1)
    const tagNum = pad(randomTag, 4)
    const tagName = ['DSC ', 'MOV ', 'IMG ']
    const idxName = randomNum(2, 0)
    const searchTag = tagName[idxName] + tagNum

    const durationArr = ['short', 'medium', 'long']
    const searchDuration = durationArr[idxName]

    const searchObj = {
      tag: searchTag,
      duration: searchDuration
    }
    // console.log('generateParams: ', searchObj)
    return searchObj
  }

  function search () {
    const randomTag = randomNum(800, 1)
    const tagNum = pad(randomTag, 4)
    const tagName = ['DSC ', 'MOV ', 'IMG ']
    const idxName = randomNum(2, 0)
    const searchTag = tagName[idxName] + tagNum

    console.log('generatedParams from search function: ', generateParams())

    getYoutubeResult(searchTag)
      .then((resultData) => {
        const idArray = resultData.map(item => item.id.videoId)
        console.log('idArray: ', idArray)
        setVidId(idArray)
        return idArray
      })
      .then((id) => {
        return getStatistics(id)
      })
      .then((data) => {
        const viewArray = data.items.map(ele => ele.statistics.viewCount)

        const vidStats = data.items.map(ele => ele.statistics)
        console.log('vidStats: ', vidStats)

        const minViews = Math.min(...viewArray)
        setMinView(minViews)
        const idx = viewArray.indexOf(minViews.toString())
        setIndex(idx)
        return minViews === 0 ? null : setToggle(!toggle)
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <VideoPlayer id={vidId[index]} setToggle={setToggle} toggle={toggle} minView={minView}/>
    </>
  )
}

export default GetVid
