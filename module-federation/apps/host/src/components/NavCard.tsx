// third-party
import { Link } from 'react-router-dom'

interface NavCardProps {
  title: string
  description: string
  href: string
  label: string
}

export const NavCard = ({ title, description, href, label }: NavCardProps) => {
  return (
    <Link
      to={href}
      className="group flex flex-col gap-4 rounded-xl border border-surface-border bg-surface-base p-6 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-display text-lg font-semibold text-primary">{title}</h3>
        <span className="translate-x-0 text-muted transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
      <span className="mt-auto text-xs font-medium text-accent">{label}</span>
    </Link>
  )
}
