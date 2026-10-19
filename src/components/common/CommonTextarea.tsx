import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CommonTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
  containerClassName?: string;
}

export const CommonTextarea = forwardRef<HTMLTextAreaElement, CommonTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      maxLength,
      showCharCount = false,
      containerClassName,
      className,
      rows = 4,
      required,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={inputId}
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
            >
              {label}
              {required && <span className="text-rose-500 ml-1">*</span>}
            </label>
          )}

          {showCharCount && maxLength && (
            <span className="text-xs text-slate-400">
              {currentLength} / {maxLength}
            </span>
          )}
        </div>

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          value={value}
          maxLength={maxLength}
          required={required}
          className={cn(
            'w-full rounded-md border bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600',
            'disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed resize-y',
            error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-300 hover:border-slate-400',
            className
          )}
          {...props}
        />

        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

CommonTextarea.displayName = 'CommonTextarea';
export default CommonTextarea;
