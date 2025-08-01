export const EXPORT_IMPORT_DATE_FORMAT: string = 'YYYY/M/D';

export const FIXED_HEADER_TITLES = {
  EMAIL: 'Email',
  EMPLOYEE_NAME: 'Employee Name',
  BUSINESS_UNIT: 'Business Unit',
  DEPARTMENT: 'Department',
};

export const ATTENDANCE_LEGEND = {
  1: 'REMOTE',
  2: 'FIELD',
  3: 'ETILER_OFFICE',
  4: 'ANATOLIAN_OFFICE',
  5: 'ANKARA_OFFICE',
  6: 'IZMIR_OFFICE',
};

export const ATTENDANCE_ENABLED_OFFICE_IDS = {
  // These office ids are workday office ids.To not break the existing functionality, we are using these ids.
  // These ids are mapped to the office ids in backend side.Corresponding mongo ids are also written in comments.
  ETILER_OFFICE: 'HQTUXX1001', // '656f547f5fbcb4abcaba169f',
  ANATOLIAN_OFFICE: 'LOCATION-3-447', // '65ccce83d96a88ed4203b1fe',
  ANKARA_OFFICE: 'HQTUXX1002', // '656f547f88b66547d2b28fb3',
  IZMIR_OFFICE: 'HQTUXX1003', // '656f547f5fbcb4cd09ba1695',
};

export const MAX_ALLOWED_CAPACITY_ROW_COUNT = 10000;

export const ATTENDANCE_STATUS = {
  REMOTE_WORKING: 'REMOTE_WORKING',
  FIELD: 'FIELD',
  INVITED: 'INVITED',
};
