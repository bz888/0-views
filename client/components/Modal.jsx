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
            <motion.h1
              className='h1-title'
              onClick={handleClose}
            >
              {text}
            </motion.h1>
            <motion.p className='p-title'>
              William Linscott <br></br>
              Coding: Qianye Lin, Ben Zhao <br></br>
              <br></br>
              N.B. After New Media contains previously unwatched videos<br></br>
              from YouTube. Please note they are randomised and unfiltered<br></br>
              so watch at your own discretion.
            </motion.p>
          </motion.div>
      }

    </Backdrop>
  )
}

export default Modal
