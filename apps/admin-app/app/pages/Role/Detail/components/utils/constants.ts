export const employeeFields = {
  RoleId: 'RoleId',
  RoleName: 'RoleName',
  UserId: 'UserId',
  UserEmail: 'UserEmail',
  EmployeeId: 'EmployeeId',
  EmployeeTitle: 'EmployeeTitle',
  EmployeeDepartmentId: 'EmployeeDepartmentId',
  EmployeeDepartmentName: 'EmployeeDepartmentName',
  UserCountryCode: 'UserCountryCode',
} as const;

export const HAS_GLOBAL_ACCESS = 'GLOBAL';

export const EXCEL_TABLE_NAME = {
  tr: 'RolDetayÇalışanTablosu',
  en: 'RoleDetailEmployeeTable',
} as const;

type Field = {
  key: string;
  title: string;
  default: string;
}

export const excelConfig: { fields: Field[] } = {
  fields: [
    {
      key: 'RoleId',
      title: 'RoleId',
      default: '',
    },
    {
      key: 'RoleName',
      title: 'RoleName',
      default: '',
    },
    {
      key: 'UserId',
      title: 'UserId',
      default: '',
    },
    {
      key: 'UserEmail',
      title: 'UserEmail',
      default: '',
    },
    {
      key: 'EmployeeId',
      title: 'EmployeeId',
      default: '',
    },
    {
      key: 'EmployeeTitle',
      title: 'EmployeeTitle',
      default: '',
    },
    {
      key: 'EmployeeDepartmentId',
      title: 'EmployeeDepartmentId',
      default: '',
    },
    {
      key: 'EmployeeDepartmentName',
      title: 'EmployeeDepartmentName',
      default: '',
    },
    {
      key: 'UserCountryCode',
      title: 'UserCountryCode',
      default: '',
    },
  ],
};
