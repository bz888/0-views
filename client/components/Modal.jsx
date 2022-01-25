import React from 'react'
import { motion } from 'framer-motion'

import Backdrop from './Backdrop'
import LoadAnim from './LoadAnim'

function Modal ({ handleClose, text, load }) {
  const dropIn = {
    initial: {
      y: '0',
      opacity: 1
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 400,
        stiffness: 800
      }
    },
    exit: {
      y: '-100vh',
      opacity: 0
    }
  }

  return (
    <Backdrop onClick={handleClose}>
      {
        load
          ? <LoadAnim/>
          : <motion.div
            className='modal'
            variants={dropIn}
            initial='initial'
            animate='visble'
            exit='exit'
          >
            <motion.button
              className='button-30'
              onClick={handleClose}
              whileHover={{ scale: 1.5 }}>{text}</motion.button>
          </motion.div>
      }

    </Backdrop>
  )
}

export default Modal
