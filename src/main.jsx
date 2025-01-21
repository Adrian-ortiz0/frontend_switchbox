import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SwitchBox } from './SwitchBox.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SwitchBox />
  </StrictMode>
)
