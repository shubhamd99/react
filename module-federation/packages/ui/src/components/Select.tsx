import { Ref, SelectHTMLAttributes } from 'react';
import cn from 'classnames';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  ref?: Ref<HTMLSelectElement>;
  label?: string;
  error?: string;
  placeholder?: string;
}

export function Select({
  label,
  error,
  placeholder,
  id,
  ref,
  className,
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-medium text-primary"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'h-9 w-full cursor-pointer rounded-md border bg-surface-base px-3 text-sm text-primary',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
          'disabled:cursor-not-allowed disabled:bg-surface-raised disabled:text-muted',
          error
            ? 'border-danger focus:ring-danger'
            : 'border-surface-border hover:border-muted',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}
