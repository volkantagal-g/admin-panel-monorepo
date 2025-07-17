import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_STATUS_AND_BUSY.LIST}_`;

export const { Types, Creators } = createActions({
  filterCourierRequest: { domains: [], status: null, warehouse: null, reason: null, timeSpent: null, currentPage: 1, rowsPerPage: 10 },
  filterCourierSuccess: { data: {} },
  filterCourierFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
