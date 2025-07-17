import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ORDER_COUNTER}_`;

export const { Types, Creators } = createActions({
  setFilterParams: { filterParams: {} },
  getTotalOrderCountsDataRequest: null,
  getTotalOrderCountsDataSuccess: { data: {} },
  getTotalOrderCountsDataFailure: null,
  initPage: null,
  destroyPage: null,
}, { prefix });
