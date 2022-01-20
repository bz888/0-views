import React from 'react'
// import { stateLogger } from '../../stateLogger'
import { motion } from 'framer-motion'

const Backdrop = ({ children }) => {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
