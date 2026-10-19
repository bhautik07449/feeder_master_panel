import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import StatsBar from '@/components/common/StatsBar';
import { BRAND_CONFIG, DEFAULT_MASTER_STATS } from '@/config/master.config';

export interface AdminPanelLayoutProps {
  children: React.ReactNode;
}

export const AdminPanelLayout: React.FC<AdminPanelLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Fixed Position Header at Top */}
      <div className="flex-shrink-0 z-40 w-full">
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Main Body: Fixed Left Sidebar + Scrollable Main Content */}
      <div className="flex-1 flex overflow-hidden relative min-h-0">
        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Fixed Position Sidebar on Left */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Scrollable Center Content Area - only this area scrolls! */}
        <main className="flex-1 h-full overflow-y-auto custom-scroll p-4 sm:p-6 lg:p-8 w-full min-w-0">
          <div className="w-full space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Fixed Position Stats Bar at Bottom */}
      <div className="flex-shrink-0 z-30 w-full">
        <StatsBar
          stats={DEFAULT_MASTER_STATS}
          variant="boxes"
          title={BRAND_CONFIG.statsTitle}
        />
      </div>
    </div>
  );
};

export default AdminPanelLayout;
