import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { loginSuccess, setSelectedRole } from '@/store/slice/authSlice';
import {
  BRAND_CONFIG,
  DEFAULT_MASTER_STATS,
  MASTER_ROLES,
  getRoleInfo,
  validateEmail,
  validatePassword,
  validateRequired,
} from '@/config/master.config';
import { ROUTES } from '@/common/app_constants';
import { MasterRole } from '@/types';
import CommonInput from '@/components/common/CommonInput';
import CommonSelect from '@/components/common/CommonSelect';
import CommonRadioGroup from '@/components/common/CommonRadioGroup';
import CommonCheckbox from '@/components/common/CommonCheckbox';
import CommonButton from '@/components/common/CommonButton';
import StatsBar from '@/components/common/StatsBar';
import {
  Shield,
  Lock,
  Mail,
  User,
  Phone,
  Building2,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  FileBadge,
} from 'lucide-react';

export const MasterAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.auth);

  // Auth Mode: 'login' or 'register' (matching wireframe 1 toggle)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form State
  const [formData, setFormData] = useState({
    name: 'Dr. Jane Vance',
    email: 'admin@tradeexpert.org',
    password: 'password123',
    confirmPassword: 'password123',
    phone: '+1 (555) 234-5678',
    organization: 'Global Oversight Syndicate',
    rememberMe: true,
    agreeTerms: true,
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

    if (authMode === 'register') {
      const nameErr = validateRequired(formData.name, 'Full name');
      if (nameErr) newErrors.name = nameErr;

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must accept the institutional oaths';
      }
    }

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
          name: authMode === 'register' ? formData.name : 'Dr. Jane Vance',
          email: formData.email,
          role: selectedRole as MasterRole,
          organization: formData.organization,
        })
      );
      setLoading(false);
      setSuccessBanner(
        authMode === 'login'
          ? `Authenticated successfully as ${selectedRole}! Redirecting to Master Panel...`
          : `Registration submitted for ${formData.name}! Redirecting to Master Panel...`
      );

      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 700);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* =========================================================================
          Top Header: Logo, Branding & Navigation
          ========================================================================= */}
      <header className="w-full bg-white border-b border-slate-200/90 px-4 sm:px-8 lg:px-12 py-3.5 shadow-2xs">
        <div className="w-full flex items-center justify-between">
          {/* Logo matching wireframe */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              {BRAND_CONFIG.logoText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg leading-none">
                  {BRAND_CONFIG.brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hidden sm:inline-block">
                  {BRAND_CONFIG.version}
                </span>
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mt-0.5">
                {BRAND_CONFIG.panelTitle} Gateway
              </span>
            </div>
          </div>

          {/* Quick Direct Link to Post-Login Screen */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors border border-slate-200"
              title="Preview Post-Login Screen"
            >
              <span>Go to Post-Login Screen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          Main Content: Banner Motto & Login / Registration Canvas
          ========================================================================= */}
      <main className="w-full flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center space-y-6">
        {/* Wireframe Slogan Banner: "Acknowledge, Approve, Administer." */}
        <div className="w-full text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold shadow-2xs mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Master Panel Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {BRAND_CONFIG.motto}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            {BRAND_CONFIG.subtitle}
          </p>
        </div>

        {/* Success Banner */}
        {successBanner && (
          <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{successBanner}</span>
          </div>
        )}

        {/* Form Container Card */}
        <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Wireframe: "Show forms for either registration or login" */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Show forms for:
              </span>
              <CommonRadioGroup
                name="auth_mode"
                variant="pills"
                value={authMode}
                onChange={(val) => {
                  setAuthMode(val as 'login' | 'register');
                  setErrors({});
                }}
                options={[
                  { value: 'login', label: 'Login (Authorized Access)' },
                  { value: 'register', label: 'Registration (New Authority)' },
                ]}
              />
            </div>

            {/* Wireframe: One of field is for (Role Selection) -> dropdown [v] */}
            <div className="sm:w-72">
              <CommonSelect
                label="Role Selection (Master Level)"
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {authMode === 'register' && (
                <>
                  <CommonInput
                    label="Full Legal Name"
                    placeholder="e.g. Dr. Jane Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    leftIcon={<User className="w-4 h-4" />}
                    required
                  />

                  <CommonInput
                    label="Official Phone Number"
                    placeholder="+1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    leftIcon={<Phone className="w-4 h-4" />}
                  />

                  <CommonInput
                    label="Board / Institutional Entity"
                    placeholder="e.g. Global Oversight Syndicate"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                    leftIcon={<Building2 className="w-4 h-4" />}
                    containerClassName="md:col-span-2"
                  />
                </>
              )}

              <CommonInput
                label="Institutional Email"
                type="email"
                placeholder="name@organization.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                leftIcon={<Mail className="w-4 h-4" />}
                required
                containerClassName={authMode === 'login' ? 'md:col-span-1' : ''}
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
                containerClassName={authMode === 'login' ? 'md:col-span-1' : ''}
              />

              {authMode === 'register' && (
                <CommonInput
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  error={errors.confirmPassword}
                  leftIcon={<KeyRound className="w-4 h-4" />}
                  required
                  containerClassName="md:col-span-2"
                />
              )}
            </div>

            {/* Checkbox & Links */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              {authMode === 'login' ? (
                <CommonCheckbox
                  label="Remember authorized session on this device"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                />
              ) : (
                <div className="flex flex-col">
                  <CommonCheckbox
                    label="I affirm compliance with institutional oaths & governance charter"
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, agreeTerms: e.target.checked })
                    }
                    required
                  />
                  {errors.agreeTerms && (
                    <span className="text-xs text-rose-600 font-semibold mt-1">
                      {errors.agreeTerms}
                    </span>
                  )}
                </div>
              )}

              {authMode === 'login' && (
                <a
                  href="#recover"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password recovery dispatch instructions sent to institutional email.');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Forgot access credentials?
                </a>
              )}
            </div>

            {/* Wireframe: [ Submit ] button */}
            <div className="pt-4 flex justify-center">
              <CommonButton
                type="submit"
                size="lg"
                className="w-full sm:w-80 font-bold text-base py-3 shadow-md"
                isLoading={loading}
              >
                {authMode === 'login' ? 'Submit' : 'Submit Registration'}
              </CommonButton>
            </div>
          </form>
        </div>
      </main>

      {/* =========================================================================
          Wireframe 1 Bottom Bar: Important Stats
          ========================================================================= */}
      <StatsBar
        stats={DEFAULT_MASTER_STATS}
        variant="boxes"
        title={BRAND_CONFIG.statsTitle}
        className="w-full"
      />
    </div>
  );
};

export default MasterAuthPage;
