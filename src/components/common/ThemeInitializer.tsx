import React, { useEffect, useState } from 'react';
import { applyMasterTheme, MASTER_THEME, THEME_PRESETS, MasterThemeConfig } from '@/config/master.config';
import { Palette, Check, Sparkles, X } from 'lucide-react';

export const ThemeInitializer: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<MasterThemeConfig>(MASTER_THEME);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Apply default or stored theme on initial mount
    applyMasterTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const handleOpenTheme = () => setIsOpen(true);
    window.addEventListener('open-theme-settings', handleOpenTheme);
    return () => window.removeEventListener('open-theme-settings', handleOpenTheme);
  }, []);

  const handleSelectPreset = (presetKey: string) => {
    const presetColors = THEME_PRESETS[presetKey];
    if (presetColors) {
      const updatedTheme: MasterThemeConfig = {
        ...currentTheme,
        activePreset: presetKey,
        colors: presetColors,
      };
      setCurrentTheme(updatedTheme);
      applyMasterTheme(updatedTheme);
    }
  };

  const handleRadiusChange = (radius: string) => {
    const updatedTheme: MasterThemeConfig = {
      ...currentTheme,
      borderRadius: radius,
    };
    setCurrentTheme(updatedTheme);
    applyMasterTheme(updatedTheme);
  };

  return (
    <>
      {/* Floating Theme Customizer Button (bottom right corner) */}
      <div className="fixed bottom-14 right-4 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full shadow-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all hover:scale-105 active:scale-95"
          title="Customize Theme & Global Styles"
        >
          <Palette className="w-4 h-4 text-blue-600 animate-pulse" />
          <span className="hidden sm:inline">Theme Customizer</span>
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
        </button>
      </div>

      {/* Floating Modal / Panel for live theme preview */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">Global Master Theme</h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            All themes are managed in <code className="text-blue-600 font-semibold">master.config.ts</code>. Changing values in that file updates the entire website!
          </p>

          {/* Color Presets */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Color Palette Presets
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {Object.entries(THEME_PRESETS).map(([key, preset]) => {
                const isSelected = currentTheme.activePreset === key;
                const formattedName = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase());

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectPreset(key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shadow-2xs border border-white"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span>{formattedName}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Border Radius Options */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Global Border Radius
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Crisp (8px)', val: '0.5rem' },
                { label: 'Modern (12px)', val: '0.75rem' },
                { label: 'Soft (16px)', val: '1rem' },
              ].map((r) => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => handleRadiusChange(r.val)}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded border transition-all ${
                    currentTheme.borderRadius === r.val
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeInitializer;
