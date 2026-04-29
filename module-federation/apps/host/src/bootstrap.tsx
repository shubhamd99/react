// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// feature
import App from './App'

// styles
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
