/**
 * Central re-export from master.config.ts
 */
export {
  MASTER_ROLE_NAMES as MASTER_ROLES,
  CATEGORIES,
} from '@/config/master.config';

export const TASK_STATUSES = [
  'Pending',
  'In Review',
  'Proof Read',
  'Approved',
  'Submitted',
] as const;
