import { DEPARTMENT_LEVELS } from '../constants';

export const DATE_FORMAT = 'MM/DD/YYYY';

export const EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS = {
  MY_LEAVES_TAB: 'my_leaves',
  MANAGER_VIEW_TAB: 'manager_view',
  MY_TEAM_TAB: 'my_team',
};

export const SELECT_DEPARTMENT_FILTERS_FOR_CALENDAR = {
  fields: ['_id', 'name'],
  isActive: true,
  levels: [DEPARTMENT_LEVELS.MAIN_DEPARTMENT],
};

export const VALID_BIRTHDAY_LEAVE_DAY = [1];

export const VALID_TAKE_CARE_OF_YOURSELF_LEAVE_DAY = [1];
