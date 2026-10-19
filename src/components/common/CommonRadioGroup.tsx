import React from 'react';
import { cn } from '@/lib/utils';
import { SelectOption } from '@/types';

export interface CommonRadioGroupProps {
  label?: string;
  name: string;
  options: (string | SelectOption)[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'radio' | 'pills' | 'cards';
  orientation?: 'horizontal' | 'vertical';
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}

export const CommonRadioGroup: React.FC<CommonRadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  variant = 'radio',
  orientation = 'vertical',
  error,
  helperText,
  required,
  className,
  containerClassName,
  disabled = false,
}) => {
  const formattedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  return (
    <div className={cn('w-full flex flex-col gap-2', containerClassName)}>
      {label && (
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </span>
      )}

      {/* Pill buttons variant */}
      {variant === 'pills' && (
        <div
          role="radiogroup"
          aria-label={label}
          className={cn(
            'inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/80 gap-1',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            className
          )}
        >
          {formattedOptions.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={disabled}
                onClick={() => onChange(opt.value)}
                style={{
                  borderRadius: 'calc(var(--brand-radius, 0.5rem) - 2px)',
                  ...(isSelected ? { color: 'var(--brand-primary)' } : {}),
                }}
                className={cn(
                  'flex-1 px-4 py-2 text-sm font-semibold transition-all text-center select-none',
                  isSelected
                    ? 'bg-white shadow-sm border border-slate-200/60 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Cards variant */}
      {variant === 'cards' && (
        <div
          role="radiogroup"
          aria-label={label}
          className={cn(
            'grid gap-2.5',
            orientation === 'horizontal' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1',
            className
          )}
        >
          {formattedOptions.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <div
                key={opt.value}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => !disabled && onChange(opt.value)}
                onKeyDown={(e) => {
                  if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
                    e.preventDefault();
                    onChange(opt.value);
                  }
                }}
                className={cn(
                  'cursor-pointer rounded-lg border p-3.5 transition-all text-left flex items-start gap-3 select-none',
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center transition-colors flex-shrink-0',
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                  )}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                  {opt.description && (
                    <div className="text-xs text-slate-500 mt-0.5">{opt.description}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Standard radio buttons */}
      {variant === 'radio' && (
        <div
          role="radiogroup"
          aria-label={label}
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            className
          )}
        >
          {formattedOptions.map((opt) => {
            const isSelected = value === opt.value;
            const inputId = `${name}-${opt.value.replace(/\s+/g, '-')}`;
            return (
              <label
                key={opt.value}
                htmlFor={inputId}
                className={cn(
                  'flex items-center gap-2.5 text-sm cursor-pointer select-none text-slate-700 hover:text-slate-900',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <input
                  type="radio"
                  id={inputId}
                  name={name}
                  value={opt.value}
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => onChange(opt.value)}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-offset-0 transition-colors"
                />
                <span className="font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export default CommonRadioGroup;
