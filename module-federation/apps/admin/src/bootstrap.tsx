// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// feature
import AdminShell from './AdminShell'

// styles
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminShell />
  </StrictMode>,
)
