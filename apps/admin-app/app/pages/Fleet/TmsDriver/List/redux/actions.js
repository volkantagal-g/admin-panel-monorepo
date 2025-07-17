import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.TMS_DRIVER.LIST}_`;

export const { Types, Creators } = createActions({
  filterTmsDriversRequest: {
    currentPage: 1,
    rowsPerPage: 10,
    filters: undefined,
  },
  filterTmsDriversSuccess: { data: [], totalCount: 0 },
  filterTmsDriversFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
