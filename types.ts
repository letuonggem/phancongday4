
export interface RoleConfig {
  id: string;
  name: string;
  reduction: number;
}

export interface Teacher {
  id: string;
  name: string;
  roles: string[]; // List of role names
  subjects: string;
  classes: string;
  assignedPeriods: number; // Tiết nhiệm vụ (tiết định mức theo môn)
}

export interface WeeklyLog {
  [teacherId: string]: number; // actual hours per teacher for a specific week
}

export interface WeeklyData {
  [weekNumber: number]: WeeklyLog;
}

export interface AppData {
  standardQuota: number;
  roles: RoleConfig[];
  teachers: Teacher[];
  weeklyData: WeeklyData;
}

export type TabType = 'config' | 'teachers' | 'weekly' | 'reports' | 'backup';
