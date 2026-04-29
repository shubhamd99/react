// react
import { Ref, TextareaHTMLAttributes } from 'react';

// feature
import cn from 'classnames';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  id,
  ref,
  className,
  ...props
}: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-2 block text-sm font-medium text-primary"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={4}
        className={cn(
          'w-full resize-y rounded-md border bg-surface-base px-3 py-2 text-sm text-primary placeholder:text-muted',
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
