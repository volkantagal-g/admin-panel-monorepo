import { TFunction } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { createMap, exportExcel } from '@shared/utils/common';
import { excelConfig, employeeFields, HAS_GLOBAL_ACCESS, EXCEL_TABLE_NAME } from './constants';

type ExcelDataType = Record<string, string | Date | undefined | DepartmentType>;

type ExportEmployeeUserTableProps = {
  users: UserType[],
  employeeData: { employees: EmployeeType[] },
  departmentData: { departments: DepartmentType[] },
  countries: ICountry[],
  isActive: boolean,
  filters: { statuses: string[], departments: DepartmentType[] },
  t: TFunction,
}

export const exportEmployeeUserTable = ({
  users,
  employeeData,
  departmentData,
  countries,
  isActive,
  filters,
  t,
}: ExportEmployeeUserTableProps) => {
  const { employees } = employeeData;
  const { departments } = departmentData;

  const handleCountries = (userCountries: string[]) => {
    return countries?.filter(country => userCountries?.includes(country._id)).map(country => country.code.alpha2);
  };

  const departmentsMap = createMap(departments, { field: '_id' }) as Record<string, DepartmentType>;

  const content: ExcelDataType[] = [];
  const employeeMap = createMap(employees, { field: 'workEmail' }) as Record<string, EmployeeType>;

  users?.forEach(user => {
    if (!user) return;
    if (isActive && !user.isActive) return;

    let userCountryCode = user.hasGlobalAccess ? HAS_GLOBAL_ACCESS : handleCountries(user.countries);
    userCountryCode = Array.isArray(userCountryCode)
      ? userCountryCode?.join(', ')
      : userCountryCode;

    const userAndEmployeeMerged: ExcelDataType = {
      [employeeFields.ID]: user._id,
      [employeeFields.Email]: user.email,
      [employeeFields.Name]: user.name,
      [employeeFields.CountryCode]: userCountryCode,
      [employeeFields.Activeness]: user.isActive ? t('ACTIVE') : t('INACTIVE'),
      [employeeFields.CreatedDate]: user.createdAt,
      [employeeFields.LastActiveDate]: user.lastActiveAt,
      [employeeFields.InactivatedDate]: user.lastInactivatedAt,
    };

    const employee = employeeMap[user.email] as EmployeeType;
    if (employee) {
      userAndEmployeeMerged[employeeFields.EmployeeId] = employee._id;
      userAndEmployeeMerged[employeeFields.EmployeeTitle] = employee.jobTitle;
      if (employee.department) {
        userAndEmployeeMerged[employeeFields.DepartmentName] = departmentsMap[employee.department]?.name?.[getLangKey()];
      }
    }

    if (filters?.departments?.length && !userAndEmployeeMerged[employeeFields.DepartmentName]) return;
    content.push(userAndEmployeeMerged);
  });

  return exportExcel(
    content,
    EXCEL_TABLE_NAME[getLangKey()],
    excelConfig.fields,
  );
};
