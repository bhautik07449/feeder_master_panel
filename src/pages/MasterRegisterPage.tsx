import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { loginSuccess, setSelectedRole } from '@/store/slice/authSlice';
import {
  BRAND_CONFIG,
  MASTER_ROLES,
  getRoleInfo,
} from '@/config/master.config';
import { ROUTES } from '@/common/app_constants';
import { MasterRole } from '@/types';
import CommonInput from '@/components/common/CommonInput';
import CommonSelect from '@/components/common/CommonSelect';
import CommonCheckbox from '@/components/common/CommonCheckbox';
import CommonButton from '@/components/common/CommonButton';
import { masterAuthApi } from '@/services/authApi';
import {
  Shield,
  Lock,
  Mail,
  User,
  Phone,
  Building2,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  FileBadge,
  LogIn,
  UserPlus,
} from 'lucide-react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const masterRegisterSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full legal name is required'),
  email: Yup.string()
    .email('Please enter a valid institutional email')
    .required('Institutional email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  phone: Yup.string(),
  organization: Yup.string(),
  agreeTerms: Yup.boolean().oneOf([true], 'You must affirm compliance with institutional oaths'),
});

export const MasterRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const currentRoleInfo = getRoleInfo(selectedRole as MasterRole);

  const handleRoleChange = (role: string) => {
    dispatch(setSelectedRole(role as MasterRole));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      organization: '',
      agreeTerms: false,
    },
    validationSchema: masterRegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setSuccessBanner(null);
      setGeneralError(null);

      try {
        await masterAuthApi.register({
          name: values.name,
          email: values.email,
          password: values.password,
          role: selectedRole as MasterRole,
          phone: values.phone,
          organization: values.organization,
        });

        const loginRes = await masterAuthApi.login({
          email: values.email,
          password: values.password,
          role: selectedRole as MasterRole,
        });

        const user = loginRes.user || {
          id: '1',
          name: values.name,
          email: values.email,
          role: selectedRole as MasterRole,
          organization: values.organization,
        };

        dispatch(loginSuccess(user));
        setLoading(false);
        setSuccessBanner(
          `Registration complete for ${values.name}! Role: ${selectedRole}. Redirecting to Master Panel...`
        );

        setTimeout(() => {
          navigate(ROUTES.DASHBOARD);
        }, 700);
      } catch (err: any) {
        setLoading(false);
        setGeneralError(err.message || 'Registration failed. Please review your credentials.');
      }
    },
  });

  return (
    <div className="min-h-screen h-screen w-full bg-slate-50 flex flex-col justify-between overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header Bar */}
      <header className="w-full bg-white border-b border-slate-200/90 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 z-10 shadow-2xs">
        <div className="flex items-center gap-3">
          <div
            style={{ backgroundColor: 'var(--brand-primary)' }}
            className="w-9 h-9 rounded-xl text-white flex items-center justify-center font-black text-lg shadow-sm"
          >
            {BRAND_CONFIG.logoText}
          </div>
          <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
            {BRAND_CONFIG.brandName}
          </span>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {BRAND_CONFIG.version}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
            <Shield className="w-3.5 h-3.5" />
            <span>Master Governance</span>
          </div>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-6 overflow-y-auto">
        {/* Wireframe Slogan Banner */}
        <div className="w-full max-w-2xl text-center mb-3">
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {BRAND_CONFIG.motto}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg mx-auto hidden sm:block mt-0.5">
            {BRAND_CONFIG.subtitle}
          </p>
        </div>

        {/* Success Notification Banner */}
        {successBanner && (
          <div className="w-full max-w-2xl mb-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{successBanner}</span>
          </div>
        )}

        {/* Error Notification Banner */}
        {generalError && (
          <div className="w-full max-w-2xl mb-2 bg-rose-50 border border-rose-200 text-rose-800 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{generalError}</span>
          </div>
        )}

        {/* Form Container Card - Full-sized 2-column layout */}
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
          {/* Form Switcher & Role Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Form:
              </span>
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/80 gap-1">
                <Link
                  to={ROUTES.LOGIN}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-md transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <button
                  type="button"
                  style={{ color: 'var(--brand-primary)' }}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-bold bg-white shadow-xs border border-slate-200/60 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </div>
            </div>

            {/* Role Selection dropdown */}
            <div className="sm:w-64">
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
                className="h-11 text-sm font-semibold"
              />
            </div>
          </div>

          {/* Role Description Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-3">
            <FileBadge className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-900">
                Selected Role: {currentRoleInfo.label}
              </span>
              <p className="text-slate-500 text-xs font-medium leading-relaxed mt-0.5">
                {currentRoleInfo.description}
              </p>
            </div>
          </div>

          {/* Registration Form with Formik - 2 Column Grid */}
          <form onSubmit={formik.handleSubmit} className="w-full space-y-3.5" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              <CommonInput
                id="master-reg-name"
                name="name"
                label="Full Legal Name"
                placeholder="Enter your full legal name..."
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                leftIcon={<User className="w-4 h-4" />}
                required
                className="h-11 text-sm"
              />

              <CommonInput
                id="master-reg-email"
                name="email"
                label="Institutional Email"
                type="email"
                placeholder="Enter institutional email address..."
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                leftIcon={<Mail className="w-4 h-4" />}
                required
                className="h-11 text-sm"
              />

              <CommonInput
                id="master-reg-phone"
                name="phone"
                label="Official Phone Number"
                placeholder="e.g. +1 (555) 000-0000"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                leftIcon={<Phone className="w-4 h-4" />}
                className="h-11 text-sm"
              />

              <CommonInput
                id="master-reg-org"
                name="organization"
                label="Board / Institutional Entity"
                placeholder="Enter board or organization title..."
                value={formik.values.organization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.organization && formik.errors.organization ? formik.errors.organization : undefined}
                leftIcon={<Building2 className="w-4 h-4" />}
                className="h-11 text-sm"
              />

              <CommonInput
                id="master-reg-password"
                name="password"
                label="Master Password"
                type="password"
                placeholder="Enter master password (min. 6 characters)..."
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                leftIcon={<Lock className="w-4 h-4" />}
                required
                className="h-11 text-sm"
              />

              <CommonInput
                id="master-reg-confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your master password..."
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
                leftIcon={<KeyRound className="w-4 h-4" />}
                required
                className="h-11 text-sm"
              />
            </div>

            {/* Compliance Terms Checkbox */}
            <div className="pt-1">
              <CommonCheckbox
                id="master-reg-terms"
                name="agreeTerms"
                label="I affirm compliance with institutional oaths & governance charter"
                checked={formik.values.agreeTerms}
                onChange={formik.handleChange}
                required
              />
              {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                <span className="text-xs text-rose-600 font-semibold mt-1 block">
                  {formik.errors.agreeTerms}
                </span>
              )}
            </div>

            {/* Wireframe 1: [ Submit ] button */}
            <div className="pt-2 flex flex-col items-center gap-2">
              <CommonButton
                type="submit"
                size="md"
                className="w-full h-11 font-bold text-sm sm:text-base py-2.5 shadow-sm"
                isLoading={loading || formik.isSubmitting}
              >
                Submit Registration
              </CommonButton>

              <p className="text-xs sm:text-sm text-slate-500">
                Already hold authorized credentials?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Log into Master Panel
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Slim Stats Bar */}
      <footer className="w-full bg-white border-t border-slate-200/90 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-slate-500 flex-shrink-0 z-10">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="font-bold text-slate-700">Governance Protocol:</span>
          <span>100% Audit Logged</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">256-bit Institutional Encryption</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">Strict RBAC Verification</span>
        </div>
        <div className="text-xs text-slate-400 hidden sm:block">
          &copy; {new Date().getFullYear()} {BRAND_CONFIG.brandName}
        </div>
      </footer>
    </div>
  );
};

export default MasterRegisterPage;
