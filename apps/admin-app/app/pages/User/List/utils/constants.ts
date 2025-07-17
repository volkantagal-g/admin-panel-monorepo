export const employeeFields = {
  ID: 'ID',
  Email: 'Email',
  Name: 'Name',
  EmployeeId: 'EmployeeId',
  EmployeeTitle: 'EmployeeTitle',
  DepartmentName: 'DepartmentName',
  CountryCode: 'CountryCode',
  CreatedDate: 'CreatedDate',
  Activeness: 'Activeness',
  LastActiveDate: 'LastActiveDate',
  InactivatedDate: 'InactivatedDate',
} as const;

export const HAS_GLOBAL_ACCESS = 'GLOBAL';

export const EXCEL_TABLE_NAME = {
  tr: 'KullanıcılarTablosu',
  en: 'UsersTable',
} as const;

type Field = {
  key: string;
  title: string;
  default: string;
}

export const excelConfig: { fields: Field[] } = {
  fields: [
    {
      key: 'Activeness',
      title: 'Activeness',
      default: '',
    },
    {
      key: 'ID',
      title: 'ID',
      default: '',
    },
    {
      key: 'Email',
      title: 'Email',
      default: '',
    },
    {
      key: 'Name',
      title: 'Name',
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
      key: 'DepartmentName',
      title: 'DepartmentName',
      default: '',
    },
    {
      key: 'CountryCode',
      title: 'CountryCode',
      default: '',
    },
    {
      key: 'CreatedDate',
      title: 'CreatedDate',
      default: '',
    },
    {
      key: 'LastActiveDate',
      title: 'LastActiveDate',
      default: '',
    },
    {
      key: 'InactivatedDate',
      title: 'InactivatedDate',
      default: '',
    },
  ],
};
