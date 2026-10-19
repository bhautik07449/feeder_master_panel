import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { loginSuccess, setSelectedRole } from '@/store/slice/authSlice';
import {
  BRAND_CONFIG,
  MASTER_ROLES,
  getRoleInfo,
  validateEmail,
  validatePassword,
} from '@/config/master.config';
import { ROUTES } from '@/common/app_constants';
import { MasterRole } from '@/types';
import CommonInput from '@/components/common/CommonInput';
import CommonSelect from '@/components/common/CommonSelect';
import CommonCheckbox from '@/components/common/CommonCheckbox';
import CommonButton from '@/components/common/CommonButton';
import {
  Shield,
  Lock,
  Mail,
  CheckCircle2,
  FileBadge,
  LogIn,
  UserPlus,
} from 'lucide-react';

export const MasterLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.auth);

  // Form State
  const [formData, setFormData] = useState({
    email: 'admin@tradeexpert.org',
    password: 'password123',
    rememberMe: true,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const currentRoleInfo = getRoleInfo(selectedRole as MasterRole);

  const handleRoleChange = (role: string) => {
    dispatch(setSelectedRole(role as MasterRole));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessBanner(null);

    const newErrors: Record<string, string> = {};

    // Validate using common helper functions from master.config.ts
    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validatePassword(formData.password);
    if (passErr) newErrors.password = passErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    // Simulate authentication
    setTimeout(() => {
      dispatch(
        loginSuccess({
          id: 'usr_master_01',
          name: 'Dr. Jane Vance',
          email: formData.email,
          role: selectedRole as MasterRole,
          organization: 'Global Oversight Syndicate',
        })
      );
      setLoading(false);
      setSuccessBanner(
        `Authenticated successfully as ${selectedRole}! Redirecting to Master Panel...`
      );

      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 700);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Brand Header Banner above card */}
      <div className="w-full max-w-xl text-center flex flex-col items-center space-y-2 mb-6">
        <div
          style={{ backgroundColor: 'var(--brand-primary)' }}
          className="w-14 h-14 rounded-2xl text-white flex items-center justify-center font-black text-2xl shadow-md mb-1"
        >
          {BRAND_CONFIG.logoText}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 text-xl tracking-tight">
            {BRAND_CONFIG.brandName}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {BRAND_CONFIG.version}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
          <Shield className="w-3.5 h-3.5" />
          <span>Master Panel Governance</span>
        </div>

        {/* Wireframe Slogan Banner: "Acknowledge, Approve, Administer." */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-1">
          {BRAND_CONFIG.motto}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md">
          {BRAND_CONFIG.subtitle}
        </p>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="w-full max-w-xl mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{successBanner}</span>
        </div>
      )}

      {/* Form Container Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Wireframe 1: Show forms for either registration or login */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Show forms for:
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/80 gap-1">
              <button
                type="button"
                style={{ color: 'var(--brand-primary)' }}
                className="px-4 py-2 text-sm font-bold bg-white shadow-sm border border-slate-200/60 rounded-md transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <Link
                to={ROUTES.REGISTER}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-md transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </div>
          </div>

          {/* Wireframe 1: Role Selection -> dropdown [v] */}
          <div className="sm:w-60">
            <CommonSelect
              label="Role Selection"
              options={MASTER_ROLES.map((r) => ({
                value: r.id,
                label: r.label,
                description: r.description,
              }))}
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              leftIcon={<Shield className="w-4 h-4 text-blue-600" />}
              required
            />
          </div>
        </div>

        {/* Role Description Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
          <FileBadge className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-slate-900">
              Selected Role: {currentRoleInfo.label}
            </span>
            <p className="text-slate-500 mt-0.5 font-medium">
              {currentRoleInfo.description}
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-4">
            <CommonInput
              label="Institutional Email"
              type="email"
              placeholder="name@organization.org"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <CommonInput
              label="Master Access Password"
              type="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
          </div>

          {/* Remember Me & Recover Link */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <CommonCheckbox
              label="Remember session"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
            />

            <a
              href="#recover"
              onClick={(e) => {
                e.preventDefault();
                alert('Password recovery dispatch instructions sent to institutional email.');
              }}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Wireframe 1: [ Submit ] button */}
          <div className="pt-3 flex flex-col items-center gap-3">
            <CommonButton
              type="submit"
              size="lg"
              className="w-full font-bold text-base py-3 shadow-md"
              isLoading={loading}
            >
              Submit Login
            </CommonButton>

            <p className="text-xs text-slate-500">
              Need authority access?{' '}
              <Link
                to={ROUTES.REGISTER}
                className="font-bold text-blue-600 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MasterLoginPage;
