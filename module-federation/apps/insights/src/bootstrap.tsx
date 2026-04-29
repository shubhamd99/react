// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// feature
import InsightsShell from './InsightsShell'

// styles
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <InsightsShell />
    </BrowserRouter>
  </StrictMode>,
)
