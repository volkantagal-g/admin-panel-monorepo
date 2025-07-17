import { forEach as _forEach } from 'lodash';

import { IDepartment } from '@app/pages/Employee/types';
import { getLangKey } from '@shared/i18n';
import { ICascaderOption } from './types';

export const getFormattedDepartmentDSelectOptions = (departments: IDepartment[]): ICascaderOption[] => {
  const langKey = getLangKey();
  const map: Map<MongoIDType, ICascaderOption> = new Map();

  _forEach(departments, department => {
    map.set(department._id, {
      label: department.name[langKey],
      value: department._id,
      data: department,
      children: [],
    });
  });

  const resultDepartments: ICascaderOption[] = [];

  _forEach(departments, department => {
    if (department.parent) {
      const parentDepartment = map.get(department.parent);
      if (parentDepartment) {
        parentDepartment.children?.push(map.get(department._id) as ICascaderOption);
      }
    }
    else {
      resultDepartments.push(map.get(department._id) as ICascaderOption);
    }
  });

  return resultDepartments;
};
