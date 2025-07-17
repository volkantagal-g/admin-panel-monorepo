import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_LOYALTY.LIST}_`;

export const { Types, Creators } = createActions({
  getCourierLoyaltyRequest: {
    courierId: null,
    performanceGroup: null,
    levelGroup: null,
    dateRange: null,
    cityId: null,
    warehouseId: null,
    startDate: null,
    endDate: null,
    currentPage: 1,
    rowsPerPage: 10,
  },
  getCourierLoyaltySuccess: { data: [] },
  getCourierLoyaltyFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
