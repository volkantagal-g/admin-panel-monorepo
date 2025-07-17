import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getOverallStatsRequest: { selectedCity: null, selectedCountry: null },
  getOverallStatsSuccess: { data: [] },
  getOverallStatsFailure: { error: null },
  getActiveOrderStatsRequest: { cityId: null },
  getActiveOrderStatsSuccess: { data: [] },
  getActiveOrderStatsFailure: { error: null },
  getCourierPlanAndCountsRequest: {},
  getCourierPlanAndCountsSuccess: { data: [] },
  getCourierPlanAndCountsFailure: { error: null },
  getFoodCourierPlanAndCountsRequest: {},
  getFoodCourierPlanAndCountsSuccess: { data: [] },
  getFoodCourierPlanAndCountsFailure: { error: null },
  getActiveOrderCouriersAndWarehousesRequest: { cityId: null },
  getActiveOrderCouriersAndWarehousesSuccess: { data: [] },
  getActiveOrderCouriersAndWarehousesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FOOD.LIVE_MAP}_` });
