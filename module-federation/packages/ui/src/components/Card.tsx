// react
import { HTMLAttributes } from 'react'

// feature
import cn from 'classnames'

function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-xl border border-surface-border bg-surface-base shadow-sm', className)} {...props}>
      {children}
    </div>
  )
}

function Header({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between border-b border-surface-border px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

function Title({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-display text-base font-semibold text-primary', className)} {...props}>
      {children}
    </h3>
  )
}

function Body({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-5', className)} {...props}>
      {children}
    </div>
  )
}

function Footer({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-end gap-3 border-t border-surface-border px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

Card.Header = Header
Card.Title  = Title
Card.Body   = Body
Card.Footer = Footer

export { Card }
