import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.LOGS}_`;

export const { Types, Creators } = createActions({
  filterEmployeeLogsRequest: { filters: null },
  filterEmployeeLogsSuccess: { data: null },
  filterEmployeeLogsFailure: { error: null },

  exportLogsRequest: { filters: null, t: null },
  exportLogsSuccess: {},
  exportLogsFailure: {},

  setFilters: { filterData: null },
  setPagination: { paginationData: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
