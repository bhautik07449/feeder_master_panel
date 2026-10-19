import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMasterMenuList } from '@/lib/menu-list';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationMenu } from '@/types';

export interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const menuList: NavigationMenu[] = getMasterMenuList(location.pathname);

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'Category': true,
    'Sub Category': true,
    'Cohort Builder': true,
  });

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      style={{ backgroundColor: 'var(--brand-sidebar-bg)', color: 'var(--brand-sidebar-text)' }}
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-200 ease-in-out',
        'md:static md:translate-x-0 md:h-full md:z-20 flex-shrink-0',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'border-r border-slate-800/80 shadow-md select-none'
      )}
    >
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">
          Master Panel Navigation
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-1">
        {menuList.map((item) => {
          const hasSubmenus = item.submenus && item.submenus.length > 0;
          const isExpanded = expandedMenus[item.label] ?? false;
          const IconComponent = item.icon;

          return (
            <div key={item.label} className="space-y-1">
              {hasSubmenus ? (
                <button
                  type="button"
                  onClick={() => toggleSubmenu(item.label)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-colors text-slate-300 hover:text-white hover:bg-slate-800/80'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    {IconComponent && <IconComponent className="w-4 h-4 text-slate-400" />}
                    <span>{item.label}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              ) : (
                <a
                  href={item.href}
                  style={item.active ? { backgroundColor: 'var(--brand-primary)' } : undefined}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-colors',
                    item.active
                      ? 'text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    {IconComponent && (
                      <IconComponent
                        className={cn('w-4 h-4', item.active ? 'text-white' : 'text-slate-400')}
                      />
                    )}
                    <span>{item.label}</span>
                  </div>
                </a>
              )}

              {hasSubmenus && isExpanded && (
                <div className="pl-6 pr-2 py-1 space-y-1 border-l border-slate-800 ml-4">
                  {item.submenus!.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className={cn(
                        'block px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors text-slate-400 hover:text-slate-100 hover:bg-slate-800/50',
                        sub.active && 'text-blue-400 font-bold bg-slate-800'
                      )}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 text-center">
        <span>Master Panel v2.0</span>
      </div>
    </aside>
  );
};

export default Sidebar;
