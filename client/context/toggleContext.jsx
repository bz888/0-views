import React, { createContext, useContext, useState } from 'react'

const toggleContext = createContext()

export function useToggle () {
  return useContext(toggleContext)
}

export function ToggleProvider ({ children }) {
  const [playerToggle, setPlayerToggle] = useState(false)
  const value = {
    playerToggle,
    setPlayerToggle
  }
  return (
    <toggleContext.Provider value={value}>
      {children}
    </toggleContext.Provider>
  )
}
