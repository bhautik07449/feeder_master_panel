import React from 'react';
import { StatItem } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface StatsBarProps {
  stats: StatItem[];
  title?: string;
  variant?: 'arrows' | 'boxes';
  className?: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  stats,
  title = 'Important Stats:',
  variant = 'arrows',
  className,
}) => {
  return (
    <footer
      className={cn(
        'w-full bg-white border-t border-slate-200/90 px-4 sm:px-6 py-3.5 shadow-sm',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-extrabold uppercase tracking-wider text-slate-800 text-xs sm:text-sm">
            {title}
          </span>
        </div>

        {/* Arrow connected flow style (Wireframe 4 & responsive) */}
        {variant === 'arrows' && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-slate-600 font-medium">
            {stats.map((stat, idx) => (
              <React.Fragment key={stat.label}>
                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors">
                  <span className="font-extrabold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded text-xs">
                    {stat.value}
                  </span>
                  <span className="text-slate-800 font-semibold text-xs sm:text-sm">
                    {stat.label}
                  </span>
                  {stat.change && (
                    <span className="text-[11px] text-emerald-600 font-medium">
                      ({stat.change})
                    </span>
                  )}
                </div>

                {idx < stats.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline-block flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Segmented boxes style (Wireframe 1 & 2) */}
        {variant === 'boxes' && (
          <div className="flex flex-1 flex-wrap items-center justify-end gap-3 sm:gap-6 text-slate-600">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md">
                  <span className="font-bold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded text-xs">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    {stat.label}
                  </span>
                </div>
                {idx < stats.length - 1 && (
                  <div className="w-8 h-px bg-slate-300 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default StatsBar;
