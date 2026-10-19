// TypeScript definitions for Master Panel

export type MasterRole = 'Board Member' | 'Administrator' | 'Liaisoner';

export type TaskStatus = 'Pending' | 'In Review' | 'Proof Read' | 'Approved' | 'Submitted';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: MasterRole;
  organization?: string;
}

export interface TaskItem {
  id: string;
  taskLabel: string;
  editorRole: string;
  name: string;
  taskDesc: string;
  category: string;
  subCategory: string;
  status: TaskStatus;
  updatedAt: string;
  priority?: 'Low' | 'Medium' | 'High';
}

export interface StatItem {
  label: string;
  value: string | number;
  change?: string;
}

export interface NavigationSubmenu {
  href: string;
  label: string;
  active?: boolean;
}

export interface NavigationMenu {
  href: string;
  label: string;
  active?: boolean;
  icon?: any;
  submenus?: NavigationSubmenu[];
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}
