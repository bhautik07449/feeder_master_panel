import React, { useState, useRef, useEffect, forwardRef, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SelectOption } from '@/types';

export interface CommonSelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: (string | SelectOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  containerClassName?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
}

export const CommonSelect = forwardRef<HTMLDivElement, CommonSelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      value,
      defaultValue,
      onChange,
      onValueChange,
      placeholder = 'Select an option...',
      containerClassName,
      className,
      leftIcon,
      disabled = false,
      required = false,
      id,
      name,
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    const activeValue = value !== undefined ? value : (defaultValue || '');

    // Normalize options into SelectOption[]
    const formattedOptions: SelectOption[] = options.map((opt) => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return opt;
    });

    const selectedOption = formattedOptions.find((opt) => opt.value === activeValue);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
      if (disabled) return;

      if (onChange) {
        onChange({ target: { value: optionValue, name } });
      }
      if (onValueChange) {
        onValueChange(optionValue);
      }

      setIsOpen(false);
    };

    return (
      <div
        ref={containerRef}
        className={cn('w-full flex flex-col gap-1.5 relative select-none', containerClassName)}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-rose-500 ml-1">*</span>}
            </span>
          </label>
        )}

        {/* Custom Select Trigger Button */}
        <div ref={ref} className="relative w-full">
          <button
            type="button"
            id={selectId}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            style={{ borderRadius: 'var(--brand-radius, 0.5rem)' }}
            className={cn(
              'w-full flex items-center justify-between bg-white text-left text-sm transition-all',
              'py-2.5 px-3.5 border',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600',
              disabled
                ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200'
                : 'text-slate-900 border-slate-300 hover:border-slate-400 cursor-pointer shadow-2xs',
              isOpen && 'border-blue-600 ring-2 ring-blue-500/20',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
          >
            <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0 pr-2">
              {leftIcon && (
                <span className="text-blue-600 flex-shrink-0 flex items-center justify-center">
                  {leftIcon}
                </span>
              )}

              {selectedOption ? (
                <span className="truncate font-semibold text-slate-900">
                  {selectedOption.label}
                </span>
              ) : (
                <span className="truncate text-slate-400 font-normal">
                  {placeholder}
                </span>
              )}
            </div>

            <ChevronDown
              className={cn(
                'w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ease-in-out',
                isOpen && 'rotate-180 text-blue-600'
              )}
            />
          </button>

          {/* Hidden native input for form compatibility */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={value}
              required={required}
            />
          )}

          {/* Custom Styled Dropdown Menu */}
          {isOpen && (
            <div
              style={{ borderRadius: 'var(--brand-radius, 0.75rem)' }}
              className={cn(
                'absolute left-0 right-0 top-full mt-1.5 z-50',
                'bg-white border border-slate-200 shadow-xl p-1.5',
                'animate-in fade-in-0 zoom-in-95 duration-150 ease-out origin-top'
              )}
            >
              <ul
                ref={listboxRef}
                role="listbox"
                aria-label={label || 'Select option'}
                className="max-h-60 overflow-y-auto custom-scroll space-y-0.5"
              >
                {formattedOptions.length === 0 ? (
                  <li className="px-3 py-2 text-xs text-slate-400 text-center font-medium">
                    No options available
                  </li>
                ) : (
                  formattedOptions.map((opt) => {
                    const isSelected = opt.value === activeValue;
                    return (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(opt.value)}
                        style={
                          isSelected
                            ? {
                                color: 'var(--brand-primary)',
                                backgroundColor: 'var(--brand-primary-light, #eff6ff)',
                              }
                            : {}
                        }
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer select-none',
                          isSelected
                            ? 'font-bold'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
                        )}
                      >
                        <div className="flex flex-col flex-1 min-w-0 pr-2">
                          <span className="truncate">{opt.label}</span>
                          {opt.description && (
                            <span className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                              {opt.description}
                            </span>
                          )}
                        </div>

                        {isSelected && (
                          <Check
                            style={{ color: 'var(--brand-primary)' }}
                            className="w-4 h-4 flex-shrink-0"
                          />
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Error / Helper text */}
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

CommonSelect.displayName = 'CommonSelect';
export default CommonSelect;
