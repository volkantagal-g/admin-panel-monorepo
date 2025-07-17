import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getTimesheetLogsRequest: { startDate: undefined, endDate: undefined, personId: undefined, currentPage: undefined, rowsPerPage: undefined },
  getTimesheetLogsSuccess: { data: undefined },
  getTimesheetLogsFailure: null,

  getPersonListRequest: { name: undefined },
  getPersonListSuccess: { data: undefined },
  getPersonListFailure: null,

  getWarehousesRequest: {},
  getWarehousesSuccess: { data: undefined },
  getWarehousesFailure: null,

  getLeaveTypesRequest: {},
  getLeaveTypesSuccess: { data: undefined },
  getLeaveTypesFailure: null,

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TIMESHEET_LOGS}_` });
