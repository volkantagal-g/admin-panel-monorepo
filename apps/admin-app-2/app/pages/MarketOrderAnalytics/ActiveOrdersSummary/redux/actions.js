import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD}_`;

export const { Types, Creators } = createActions(
  {
    getActiveOrdersExecutiveStatsRequest: { data: null },
    getActiveOrdersExecutiveStatsSuccess: { data: null },
    getActiveOrdersExecutiveStatsFailure: { error: null },

    setFilter: { filterName: '', value: null },
    setChartFilter: { chartFilterName: '', value: null },
    resetChartFilter: { chartFilterName: '' },
    initPage: null,
    fetchInitialData: { canAccess: null },
    destroyPage: null,
  },
  { prefix },
);
