// react
import { InputHTMLAttributes, Ref } from 'react';

// feature
import cn from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  id,
  ref,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-primary"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'h-9 w-full rounded-md border bg-surface-base px-3 text-sm text-primary placeholder:text-muted',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
          'disabled:cursor-not-allowed disabled:bg-surface-raised disabled:text-muted',
          error
            ? 'border-danger focus:ring-danger'
            : 'border-surface-border hover:border-muted',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      {!error && hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
