// react
import { HTMLAttributes } from 'react'

// feature
import cn from 'classnames'

type BadgeVariant = 'default' | 'success' | 'danger' | 'warning' | 'accent'

const variantClass: Record<BadgeVariant, string> = {
  default: 'bg-surface-overlay text-primary',
  success: 'bg-green-50 text-success',
  danger:  'bg-red-50 text-danger',
  warning: 'bg-yellow-50 text-yellow-700',
  accent:  'bg-yellow-50 text-yellow-700',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variantClass[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
}
