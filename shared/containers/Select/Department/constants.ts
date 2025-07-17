import { EMPLOYEE_DEPARTMENT_LEVELS } from '@shared/shared/constants';

export const DEFAULT_FIELDS = ['_id', 'name', 'parent', 'level'] as const;
export const DEFAULT_IS_ACTIVE: boolean = true;
export const DEFAULT_SUB_LEVELS = [
  EMPLOYEE_DEPARTMENT_LEVELS.MAIN_DEPARTMENT,
  EMPLOYEE_DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST,
] as const;
