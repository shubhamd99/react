// react
import { ButtonHTMLAttributes, Ref } from 'react'

// feature
import { componentSize, type ComponentSize } from '../theme'
import cn from 'classnames'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

const variantClass: Record<Variant, string> = {
  primary:   'bg-primary text-white border border-primary hover:opacity-90',
  secondary: 'bg-surface-base text-primary border border-surface-border hover:bg-surface-raised',
  danger:    'bg-danger text-white border border-danger hover:opacity-90',
  ghost:     'bg-transparent text-primary border border-transparent hover:bg-surface-overlay',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  variant?: Variant
  size?: ComponentSize
  loading?: boolean
}

export function Button({ variant = 'primary', size = 'md', loading = false, disabled, className, children, ref, ...props }: ButtonProps) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight',
        'transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:pointer-events-none disabled:opacity-40',
        variantClass[variant],
        componentSize[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
