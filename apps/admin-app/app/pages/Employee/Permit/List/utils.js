import { isEmpty as _isEmpty } from 'lodash';

import { PAGINATION_MODES } from '@shared/shared/constants';
import { toFakeLocalDate } from '@shared/utils/dateHelper';

export const getRequestParams = ({ filters, pagination, _nextPageCursor, _previousPageCursor }) => {
  const params = {
    paginationMode: PAGINATION_MODES.CURSOR,
    status: filters.status,
    permitType: filters.permitType,
    reason: filters.reason,
    supervisor: filters.supervisor,
    location: filters.locationId,
    businessCountry: filters.businessCountry,
    payrollCountry: filters.payrollCountry,
    limit: pagination.limit,
    employee: filters.employee,
    ...(_nextPageCursor ? { nextPageCursor: _nextPageCursor } : undefined),
    ...(_previousPageCursor ? { previousPageCursor: _previousPageCursor } : undefined),
    ...(filters.departments && filters.departments.department ? { department: filters.departments.department } : undefined),
    ...(filters.departments && !_isEmpty(filters.departments.subDepartments) ? { subDepartments: filters.departments.subDepartments } : undefined),
  };

  if (Array.isArray(filters.dateRange)) {
    const [startDate, endDate] = filters.dateRange;

    params.startDate = toFakeLocalDate(startDate.startOf('day').valueOf()).toISOString();
    params.endDate = toFakeLocalDate(endDate.endOf('day').valueOf()).toISOString();
  }

  if (filters.departments && filters.departments.department) {
    params.department = filters.departments.department;
  }

  if (filters.departments && !_isEmpty(filters.departments.subDepartments)) {
    params.subDepartments = filters.departments.subDepartments;
  }

  return params;
};
