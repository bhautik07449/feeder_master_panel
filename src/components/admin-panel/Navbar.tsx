import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { setSelectedRole } from '@/store/slice/authSlice';
import {
  BRAND_CONFIG,
  MASTER_ROLES,
  getRoleInfo,
} from '@/config/master.config';
import { ROUTES } from '@/common/app_constants';
import { MasterRole } from '@/types';
import CommonBadge from '@/components/common/CommonBadge';
import {
  Bell,
  Settings,
  User,
  Menu,
  ChevronDown,
  LogOut,
  Shield,
  ExternalLink,
  Check,
} from 'lucide-react';

export interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedRole, currentUser } = useAppSelector((state) => state.auth);

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentRoleInfo = getRoleInfo(selectedRole as MasterRole);

  const handleSelectRole = (role: MasterRole) => {
    dispatch(setSelectedRole(role));
    setIsRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/90 shadow-2xs">
      {/* =========================================================================
          Primary Top Bar (Matching Image 2 Header)
          ========================================================================= */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="cursor-pointer flex items-center gap-2.5 select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              {BRAND_CONFIG.logoText}
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-none block">
                {BRAND_CONFIG.brandName}
              </span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mt-0.5">
                {BRAND_CONFIG.panelTitle} Post-Login
              </span>
            </div>
          </div>
        </div>

        {/* Center Title (Image 2 sketch: "Master Panel Post-Login") */}
        <div className="hidden md:flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
            Master Panel Post-Login
          </span>
        </div>

        {/* Right Icons: Notifications, Profile, Settings (Matching Image 2) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setIsProfileMenuOpen(false);
              }}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">Governance Notifications</span>
                  <button
                    onClick={() => setNotificationsCount(0)}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    Mark read
                  </button>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div className="p-2 bg-blue-50/60 rounded-lg">
                    <span className="font-bold text-blue-900 block">Category 1 review requested</span>
                    <span className="text-slate-500 text-[11px]">David Kim pending approval</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="font-bold text-slate-800 block">Cohort #8 updated</span>
                    <span className="text-slate-500 text-[11px]">Liaisoner sync complete</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Screen Switcher back to Login / Registration */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.LOGIN)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Switch to Master Panel Login / Registration Screen"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Login Screen</span>
          </button>

          {/* User Profile Pill & Dropdown (Image 2 sketch) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(!isProfileMenuOpen);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center ring-2 ring-blue-50">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  {currentUser?.name || 'Dr. Jane Vance'}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block">
                  {selectedRole}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in">
                <div className="p-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900">{currentUser?.name || 'Dr. Jane Vance'}</p>
                  <p className="text-[11px] text-slate-500">{currentUser?.email || 'admin@tradeexpert.org'}</p>
                  <CommonBadge variant={currentRoleInfo.badgeVariant} className="mt-1 text-[10px]">
                    {selectedRole}
                  </CommonBadge>
                </div>
                <button
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit to Login Screen</span>
                </button>
              </div>
            )}
          </div>

          {/* Settings Button (Image 2 wireframe: Notification, User, Setting) */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-theme-settings'));
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Master Theme & System Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          Sub-Header Context Bar (Directly from Image 2 wireframe:
          "Selected Role: _____________ | User Profile: _____________")
          ========================================================================= */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Selected Role with interactive dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold uppercase text-slate-500 tracking-wider text-[11px]">
            Selected Role:
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-md font-bold text-slate-900 shadow-2xs transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>{selectedRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-50">
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Switch Active Role Authority
                </span>
                {MASTER_ROLES.map((role) => {
                  const isCurrent = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleSelectRole(role.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold rounded-lg text-left transition-colors ${
                        isCurrent
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{role.label}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* User Profile matching wireframe */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold uppercase text-slate-500 tracking-wider text-[11px]">
            User Profile:
          </span>
          <span className="px-3 py-1 bg-white border border-slate-300 rounded-md font-semibold text-slate-800 shadow-2xs">
            {currentUser?.name || 'Dr. Jane Vance'} ({currentUser?.email || 'admin@tradeexpert.org'})
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
