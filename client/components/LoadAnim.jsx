import React from 'react'
import { motion } from 'framer-motion'

function LoadAnim () {
  const loadContainer = {
    width: '2rem',
    height: '2rem',
    display: 'flex',
    justifyContent: 'space-around'
  }
  const loadCircle = {
    display: 'block',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'black',
    borderRadius: '0.25rem'
  }

  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1
      }
    },
    end: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const loadingCircleVariants = {
    start: {
      y: '0%'
    },
    end: {
      y: '100%'
    }
  }
  const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut'
  }

  return (
    <motion.div
      style={loadContainer}
      variants={loadingContainerVariants}
      initial='start'
      animate='end'
      className='loadAnim'
    >
      <motion.span
        style={loadCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  )
}

export default LoadAnim
