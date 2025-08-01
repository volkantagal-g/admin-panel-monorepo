import { REDUX_KEY } from '@shared/shared/constants';

import { State } from './reducer';

const reduxKey = REDUX_KEY.EMPLOYEE.LOGS;

export const filtersSelector = {
  getFilters: (state: { [reduxKey: string]: State }) => state[reduxKey]?.filters,
  getPagination: (state: { [reduxKey: string]: State }) => state[reduxKey]?.pagination,
};

export const logsSelector = {
  getLogs: (state: { [reduxKey: string]: State }) => state[reduxKey]?.logs?.data,
  getIsPending: (state: { [reduxKey: string]: State }) => state[reduxKey]?.logs?.isPending,
  getIsExportPending: (state: { [reduxKey: string]: State }) => state[reduxKey]?.logs?.isExportPending,
};
