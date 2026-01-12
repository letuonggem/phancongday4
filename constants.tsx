
import { RoleConfig } from './types';

export const DEFAULT_STANDARD_QUOTA = 19;

export const INITIAL_ROLES: RoleConfig[] = [
  { id: '1', name: 'Tổ trưởng', reduction: 3 },
  { id: '2', name: 'Chủ nhiệm', reduction: 4 },
  { id: '3', name: 'Thư ký hội đồng', reduction: 2 },
  { id: '4', name: 'Tổ phó', reduction: 1 },
  { id: '5', name: 'Tổng phụ trách', reduction: 10 }
];
