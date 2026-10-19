/**
 * ============================================================================
 * MASTER CONFIGURATION FILE (master.config.ts)
 * ============================================================================
 * 
 * NOTE TO DEVELOPER / USER:
 * ----------------------------------------------------------------------------
 * This is the SINGLE SOURCE OF TRUTH for the entire Master Panel application!
 * - Change the theme colors, fonts, or border-radius below -> Applies to WHOLE website.
 * - Change the branding, motto, or logo -> Applies to WHOLE website.
 * - Change or add Roles, Statuses, Categories, or Navigation -> Applies to WHOLE website.
 * - Modify common functions (formatters, validators, badge mappers) -> Applies to WHOLE website.
 * 
 * ============================================================================
 */

import { MasterRole, TaskStatus } from '@/types';

// ============================================================================
// 1. THEME PRESETS & ACTIVE THEME CONFIGURATION
// ============================================================================

export interface ThemeColors {
  primary: string;        // Main primary accent (buttons, active tabs, highlights)
  primaryHover: string;   // Hover state for primary buttons
  primaryLight: string;   // Light tint for active backgrounds & badges
  primaryText: string;    // Text on primary buttons
  accent: string;         // Secondary accent color
  sidebarBg: string;      // Sidebar background color
  sidebarText: string;    // Sidebar text color
  cardBg: string;         // Card background
  bodyBg: string;         // Main app background
}

export interface MasterThemeConfig {
  activePreset: string;
  colors: ThemeColors;
  borderRadius: string;   // '0.5rem' | '0.75rem' | '1rem'
  fontFamily: string;
}

export const THEME_PRESETS: Record<string, ThemeColors> = {
  modernBlue: {
    primary: '#2563eb',       // Blue 600
    primaryHover: '#1d4ed8',  // Blue 700
    primaryLight: '#eff6ff',  // Blue 50
    primaryText: '#ffffff',
    accent: '#0284c7',        // Sky 600
    sidebarBg: '#0f172a',     // Slate 900
    sidebarText: '#f8fafc',
    cardBg: '#ffffff',
    bodyBg: '#f8fafc',
  },
  institutionalIndigo: {
    primary: '#4f46e5',       // Indigo 600
    primaryHover: '#4338ca',  // Indigo 700
    primaryLight: '#eef2ff',  // Indigo 50
    primaryText: '#ffffff',
    accent: '#6366f1',
    sidebarBg: '#1e1b4b',     // Deep Indigo
    sidebarText: '#f8fafc',
    cardBg: '#ffffff',
    bodyBg: '#f8fafc',
  },
  governanceEmerald: {
    primary: '#059669',       // Emerald 600
    primaryHover: '#047857',  // Emerald 700
    primaryLight: '#ecfdf5',  // Emerald 50
    primaryText: '#ffffff',
    accent: '#0d9488',        // Teal 600
    sidebarBg: '#064e3b',     // Deep Forest Emerald
    sidebarText: '#f8fafc',
    cardBg: '#ffffff',
    bodyBg: '#f8fafc',
  },
  executiveDarkSlate: {
    primary: '#334155',       // Slate 700
    primaryHover: '#1e293b',  // Slate 800
    primaryLight: '#f1f5f9',  // Slate 100
    primaryText: '#ffffff',
    accent: '#475569',
    sidebarBg: '#020617',     // Slate 950
    sidebarText: '#f8fafc',
    cardBg: '#ffffff',
    bodyBg: '#f8fafc',
  },
  royalPurple: {
    primary: '#7c3aed',       // Violet 600
    primaryHover: '#6d28d9',  // Violet 700
    primaryLight: '#f5f3ff',  // Violet 50
    primaryText: '#ffffff',
    accent: '#9333ea',
    sidebarBg: '#2e1065',     // Deep Purple
    sidebarText: '#f8fafc',
    cardBg: '#ffffff',
    bodyBg: '#f8fafc',
  },
};

/**
 * ACTIVE THEME (Modify this object or choose a preset to change whole site theme!)
 */
export const MASTER_THEME: MasterThemeConfig = {
  activePreset: 'modernBlue',
  colors: THEME_PRESETS.modernBlue,
  borderRadius: '0.75rem',    // Global corner rounding: 12px
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

// ============================================================================
// 2. BRANDING & COPY CONFIGURATION
// ============================================================================

export const BRAND_CONFIG = {
  brandName: 'TradeExpert Master Panel',
  panelTitle: 'Master Panel',
  logoText: 'M',
  version: 'v2.4 Institutional',
  motto: 'Acknowledge, Approve, Administer.',
  subtitle: 'Authorized Governance, Review & Institutional Administration Gateway',
  statsTitle: 'Important Stats:',
  copyright: '© 2026 TradeExpert Portal. All rights reserved.',
};

// ============================================================================
// 3. COMMON FIELDS & DROPDOWN VALUES
// ============================================================================

/**
 * Master Panel Roles (Image 1 & 2 Wireframes)
 */
export interface RoleDefinition {
  id: MasterRole;
  label: MasterRole;
  description: string;
  badgeVariant: 'purple' | 'info' | 'success';
}

export const MASTER_ROLES: RoleDefinition[] = [
  {
    id: 'Board Member',
    label: 'Board Member',
    description: 'Institutional governance, final sanction & policy oversight',
    badgeVariant: 'purple',
  },
  {
    id: 'Administrator',
    label: 'Administrator',
    description: 'System-wide orchestration, task review & workflow authority',
    badgeVariant: 'info',
  },
  {
    id: 'Liaisoner',
    label: 'Liaisoner',
    description: 'Cross-entity coordination, protocol mediation & cohort verification',
    badgeVariant: 'success',
  },
];

export const MASTER_ROLE_NAMES: MasterRole[] = MASTER_ROLES.map((r) => r.id);

/**
 * Task Statuses (Workflows)
 */
export interface StatusDefinition {
  status: TaskStatus;
  label: string;
  variant: 'default' | 'success' | 'warning' | 'info' | 'purple' | 'danger';
}

export const TASK_STATUS_DEFINITIONS: Record<TaskStatus, StatusDefinition> = {
  'Pending': { status: 'Pending', label: 'Pending', variant: 'default' },
  'In Review': { status: 'In Review', label: 'In Review', variant: 'warning' },
  'Proof Read': { status: 'Proof Read', label: 'Proof Read', variant: 'info' },
  'Approved': { status: 'Approved', label: 'Approved', variant: 'success' },
  'Submitted': { status: 'Submitted', label: 'Submitted', variant: 'purple' },
};

/**
 * Wireframe Top Horizontal Tabs:
 * [ Menu 1 ] [ Menu 2 ] [ Menu 3 ] [ Menu 4 ] [ Menu 5 ] [ Menu 6 ]
 */
export const MENU_TABS = [
  'Menu 1',
  'Menu 2',
  'Menu 3',
  'Menu 4',
  'Menu 5',
  'Menu 6',
] as const;

/**
 * Categories & Subcategories
 */
export const CATEGORY_STRUCTURE = {
  'Category 1': ['Subcategory 1', 'Subcategory 2'],
  'Category 2': ['Subcategory 2', 'Subcategory 3'],
  'Category 3': ['Subcategory 3', 'Subcategory 4'],
} as const;

export const CATEGORIES = Object.keys(CATEGORY_STRUCTURE);

/**
 * Bottom Stats Bar Items (Wireframe 1 & 2)
 */
export const DEFAULT_MASTER_STATS = [
  { label: 'Pending Approvals', value: 24, change: '+4 today' },
  { label: 'Active Cohorts', value: 8, change: '3 in review' },
  { label: 'Liaisons Connected', value: 142, change: '99.4% uptime' },
];

// ============================================================================
// 4. COMMON REUSABLE FUNCTIONS
// ============================================================================

/**
 * Apply the Master Theme to the Document DOM.
 * Call this function anywhere or let it run automatically.
 * It injects CSS variables to :root so Tailwind classes respond immediately.
 */
export function applyMasterTheme(theme: MasterThemeConfig = MASTER_THEME): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const { colors, borderRadius, fontFamily } = theme;

  root.style.setProperty('--brand-primary', colors.primary);
  root.style.setProperty('--brand-primary-hover', colors.primaryHover);
  root.style.setProperty('--brand-primary-light', colors.primaryLight);
  root.style.setProperty('--brand-primary-text', colors.primaryText);
  root.style.setProperty('--brand-accent', colors.accent);
  root.style.setProperty('--brand-sidebar-bg', colors.sidebarBg);
  root.style.setProperty('--brand-sidebar-text', colors.sidebarText);
  root.style.setProperty('--brand-radius', borderRadius);
  root.style.setProperty('--brand-font', fontFamily);
}

/**
 * Common Badge Variant Resolver
 */
export function getStatusBadgeVariant(status: TaskStatus): 'default' | 'success' | 'warning' | 'info' | 'purple' | 'danger' {
  return TASK_STATUS_DEFINITIONS[status]?.variant || 'default';
}

/**
 * Common Role Info Resolver
 */
export function getRoleInfo(roleName: MasterRole): RoleDefinition {
  return (
    MASTER_ROLES.find((r) => r.id === roleName) || {
      id: roleName,
      label: roleName,
      description: 'Master Panel Authority',
      badgeVariant: 'info',
    }
  );
}

/**
 * Common Field Validation Helpers
 */
export function validateEmail(email: string): string | null {
  if (!email || email.trim() === '') return 'Email address is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid institutional email';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') return `${fieldName} is required`;
  return null;
}

/**
 * Common Formatter Helpers
 */
export function truncateText(text: string, maxLength: number = 60): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function formatNumber(num: number | string): string {
  if (typeof num === 'string') return num;
  return new Intl.NumberFormat('en-US').format(num);
}
