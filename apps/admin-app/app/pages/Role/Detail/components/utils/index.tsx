import Excel from '@shared/utils/excel';
import { getLangKey } from '@shared/i18n';

import { excelConfig, employeeFields, HAS_GLOBAL_ACCESS, EXCEL_TABLE_NAME } from './constants';

export const exportEmployeeUserTable = (roleUsers: UserType[], employee: { employees: EmployeeType[] }, role: RoleType, countries: ICountry[]) => {
  const { employees } = employee;

  const handleCountries = (userCountries: MongoIDType[]) => {
    return countries?.filter(country => userCountries?.includes(country._id)).map(country => country.code.alpha2);
  };

  const roleUserAndEmployeeMerged = {} as Record<string, Record<string, string | string[] | undefined>>;
  roleUsers?.forEach((roleUser: UserType) => {
    if (!roleUser) return;

    roleUserAndEmployeeMerged[roleUser.email] = {
      [employeeFields.RoleId]: role?._id,
      [employeeFields.RoleName]: role?.name,
      [employeeFields.UserId]: roleUser._id,
      [employeeFields.UserEmail]: roleUser.email,
      [employeeFields.UserCountryCode]: roleUser.hasGlobalAccess ? HAS_GLOBAL_ACCESS : handleCountries(roleUser.countries),
    };
  });

  employees?.forEach(eachEmployee => {
    if (!eachEmployee) return;
    const existingData = roleUserAndEmployeeMerged[eachEmployee.workEmail] || {};

    existingData[employeeFields.EmployeeId] = eachEmployee._id;
    existingData[employeeFields.EmployeeTitle] = eachEmployee.businessTitle;
    existingData[employeeFields.EmployeeDepartmentId] = eachEmployee?.departmentId;
    existingData[employeeFields.UserEmail] = eachEmployee.workEmail;
    existingData[employeeFields.EmployeeDepartmentName] = eachEmployee.departmentName;

    roleUserAndEmployeeMerged[eachEmployee.workEmail] = existingData;
  });

  const content = [] as Array<Record<string, string | string[] | undefined>>;
  Object.values(roleUserAndEmployeeMerged).forEach(allUserInfo => {
    if (Array.isArray(allUserInfo.UserCountryCode)) {
      return allUserInfo?.UserCountryCode.forEach(country => {
        return content.push({
          [employeeFields.RoleId]: allUserInfo.RoleId,
          [employeeFields.RoleName]: allUserInfo.RoleName,
          [employeeFields.UserId]: allUserInfo.UserId,
          [employeeFields.UserEmail]: allUserInfo.UserEmail,
          [employeeFields.UserCountryCode]: country,
          [employeeFields.EmployeeId]: allUserInfo.EmployeeId,
          [employeeFields.EmployeeTitle]: allUserInfo.EmployeeTitle,
          [employeeFields.EmployeeDepartmentId]: allUserInfo.EmployeeDepartmentId,
          [employeeFields.EmployeeDepartmentName]: allUserInfo.EmployeeDepartmentName,
        });
      });
    }

    return content.push({
      [employeeFields.RoleId]: allUserInfo?.RoleId,
      [employeeFields.RoleName]: allUserInfo?.RoleName,
      [employeeFields.UserId]: allUserInfo?.UserId,
      [employeeFields.UserEmail]: allUserInfo?.UserEmail,
      [employeeFields.UserCountryCode]: allUserInfo?.UserCountryCode,
      [employeeFields.EmployeeId]: allUserInfo?.EmployeeId,
      [employeeFields.EmployeeTitle]: allUserInfo?.EmployeeTitle,
      [employeeFields.EmployeeDepartmentId]: allUserInfo?.EmployeeDepartmentId,
      [employeeFields.EmployeeDepartmentName]: allUserInfo?.EmployeeDepartmentName,
    });
  });

  return new Excel({
    name: EXCEL_TABLE_NAME[getLangKey()],
    fields: excelConfig.fields,
    data: content,
  }).export();
};

export const ROLE_REQUEST_STATUSES = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};
