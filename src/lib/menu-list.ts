import {
  LayoutDashboard,
  Layers,
  FolderTree,
  FileSpreadsheet,
  Users2,
  Workflow,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { NavigationMenu } from '@/types';

export function getMasterMenuList(pathname: string): NavigationMenu[] {
  return [
    {
      href: '/dashboard',
      label: 'Dashboard',
      active: pathname === '/dashboard' || pathname === '/',
      icon: LayoutDashboard,
    },
    {
      href: '#category',
      label: 'Category',
      icon: Layers,
      submenus: [
        { href: '#cat-1', label: 'Category 1 (Algorithmic Models)' },
        { href: '#cat-2', label: 'Category 2 (Research & Synthesis)' },
        { href: '#cat-3', label: 'Category 3 (Publishing & Bulletins)' },
      ],
    },
    {
      href: '#subcategory',
      label: 'Sub Category',
      icon: FolderTree,
      submenus: [
        { href: '#subcat-1', label: 'Subcategory 1 (Risk Variance)' },
        { href: '#subcat-2', label: 'Subcategory 2 (Taxonomy Infusion)' },
        { href: '#subcat-3', label: 'Subcategory 3 (Parameters Setup)' },
      ],
    },
    {
      href: '#menu-1',
      label: 'Menu (1) - Cohort Feeds',
      icon: FileSpreadsheet,
    },
    {
      href: '#menu-2',
      label: 'Menu (2) - Workflow Matrix',
      icon: Workflow,
    },
    {
      href: '#menu-3',
      label: 'Menu (3) - Audit Log',
      icon: Sliders,
    },
    {
      href: '#menu-4',
      label: 'Menu (4) - Governance',
      icon: Sparkles,
    },
    {
      href: '#cohort-builder',
      label: 'Cohort Builder',
      icon: Users2,
      submenus: [
        { href: '#develop-cohort', label: 'Develop a Cohort' },
        { href: '#review-cohort', label: 'Review a Cohort' },
      ],
    },
  ];
}
