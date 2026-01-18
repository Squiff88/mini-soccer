import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MiniSoccerGame from './GameAvatars2-good-movement.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MiniSoccerGame />
  </StrictMode>,
)
