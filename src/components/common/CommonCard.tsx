import React from 'react';
import { cn } from '@/lib/utils';

export interface CommonCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export const CommonCard: React.FC<CommonCardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className,
  bodyClassName,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col',
        className
      )}
    >
      {(title || headerAction) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div>
            {title && typeof title === 'string' ? (
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
            ) : (
              title
            )}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}

      <div className={cn('p-6 flex-1', bodyClassName)}>{children}</div>

      {footer && (
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
};

export default CommonCard;
