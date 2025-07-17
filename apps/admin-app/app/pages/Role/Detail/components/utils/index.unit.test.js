import { exportEmployeeUserTable } from '@app/pages/Role/Detail/components/utils/index';
import { mockedRole } from '@shared/api/role/index.mock.data';
import { mockedCountries } from '@shared/api/countryInfo/index.mock.data';
import { mockedEmployee } from '@shared/api/employee/index.mock.data';
import { excelConfig } from '@app/pages/Role/Detail/components/utils/constants';
import { mockedUser } from '@shared/api/user/index.mock.data';

import Excel from '@shared/utils/excel';

const mockedExport = jest.fn();
jest.mock('@shared/utils/excel', () => {
  return jest.fn().mockImplementation(() => {
    return { export: mockedExport };
  });
});

describe('exportEmployeeUserTable', () => {
  beforeEach(() => {
    Excel.mockClear();
    mockedExport.mockClear();
  });

  it('should merge the inputs correctly', () => {
    const user = { ...mockedUser, roles: [mockedRole._id] };
    const employee = {
      ...mockedEmployee,
      departmentId: '5ac88cfb7d2f1bb0a8ae704e',
      departmentName: 'Technology',
      workEmail: user.email,
      jobTitle: 'Software Engineer',
    };

    exportEmployeeUserTable([user], { employees: [employee] }, mockedRole, mockedCountries);

    expect(Excel).toHaveBeenCalledWith({
      name: 'RoleDetailEmployeeTable',
      fields: excelConfig.fields,
      data: [
        {
          EmployeeDepartmentId: employee.departmentId,
          EmployeeDepartmentName: employee.departmentName,
          EmployeeId: employee._id,
          EmployeeTitle: employee.businessTitle,
          RoleId: '5c9b8f9f9c8f8b0f8c8f8f8f',
          RoleName: 'Mocked Role',
          UserCountryCode: 'GLOBAL',
          UserEmail: user.email,
          UserId: user._id,
        },
      ],
    });
  });
});
