import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CommonCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  containerClassName?: string;
}

export const CommonCheckbox = forwardRef<HTMLInputElement, CommonCheckboxProps>(
  (
    {
      label,
      description,
      error,
      containerClassName,
      className,
      checked,
      onChange,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        <label
          htmlFor={inputId}
          className={cn(
            'inline-flex items-start gap-2.5 cursor-pointer select-none group',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={inputId}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                'w-4 h-4 rounded border transition-all flex items-center justify-center',
                'border-slate-300 bg-white group-hover:border-slate-400',
                'peer-checked:bg-blue-600 peer-checked:border-blue-600 text-white',
                'peer-focus:ring-2 peer-focus:ring-blue-500/20',
                error && 'border-rose-500',
                className
              )}
            >
              {checked && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>

          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span className="text-sm font-medium text-slate-800 leading-tight">
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-slate-500 mt-0.5">{description}</span>
              )}
            </div>
          )}
        </label>

        {error && <p className="text-xs text-rose-600 font-medium pl-6">{error}</p>}
      </div>
    );
  }
);

CommonCheckbox.displayName = 'CommonCheckbox';
export default CommonCheckbox;
