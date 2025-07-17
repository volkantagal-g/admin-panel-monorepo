import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCourierStatusCountsRequest: { data: {} },
  getCourierStatusCountsSuccess: { data: {} },
  getCourierStatusCountsFailure: { error: null },

  downloadCourierStatusCountsForAllWarehousesCSVRequest: { t: () => {} },
  downloadCourierStatusCountsForAllWarehousesCSVSuccess: { data: {} },
  downloadCourierStatusCountsForAllWarehousesCSVFailure: { error: null },

  setFilters: { filters: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.LIVE_MONITORING.COURIER_LIVE_MONITORING}_` });
