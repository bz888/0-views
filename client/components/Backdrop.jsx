import React from 'react'
import { motion } from 'framer-motion'

const Backdrop = ({ children }) => {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
