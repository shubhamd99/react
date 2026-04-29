// react
import { type ReactNode } from 'react'

// third-party
import { Link } from 'react-router-dom'

interface Props {
  brand:    ReactNode
  nav?:     ReactNode
  actions?: ReactNode
}

const HomeLogo = () => (
  <Link to="/" className="flex shrink-0 items-center transition-opacity hover:opacity-70">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" className="fill-primary" />
      <path d="M7 14.5L14 8l7 6.5V21h-4.5v-4h-5v4H7v-6.5z" fill="white" />
    </svg>
  </Link>
)

const AppHeader = ({ brand, nav, actions }: Props) => (
  <header className="sticky top-0 z-40 h-14 border-b border-surface-border bg-surface-base">
    <div className="flex h-full items-center gap-4 px-6">
      <HomeLogo />
      <div className="h-5 w-px bg-surface-border" />
      <div className="text-base font-semibold text-primary">{brand}</div>
      {nav && <nav className="flex items-center gap-1">{nav}</nav>}
      {actions && <div className="ml-auto flex items-center gap-3">{actions}</div>}
    </div>
  </header>
)

export default AppHeader
