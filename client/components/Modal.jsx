import React from 'react'
import { motion } from 'framer-motion'

import Backdrop from './Backdrop'

function Modal ({ handleClose, text }) {
  const dropIn = {
    initial: {
      y: '0',
      opacity: 1
    },
    visible: {
      y: '100vh',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: '-100vh',
      opacity: 0
    }
  }
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        // onClick={(e) => e.stopPropagation()}
        className='modal'
        variants={dropIn}
        initial='initial'
        animate='visble'
        exit='exit'
      >
        <motion.button
          className='button-30'
          onClick={handleClose}
          whileHover={{ scale: 3 }}>{text}</motion.button>
        {/* <button onClick={handleClose}>Begin</button> */}
      </motion.div>
    </Backdrop>
  )
}

export default Modal
