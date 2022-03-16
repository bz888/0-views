import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import { ToggleProvider } from './context/toggleContext'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ToggleProvider>
      <App />
    </ToggleProvider>,
    document.getElementById('app')
  )
})
