import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getOverallStatsRequest: { selectedCity: null, selectedCountry: null },
  getOverallStatsSuccess: { data: [] },
  getOverallStatsFailure: { error: null },
  getActiveOrderStatsRequest: { cityId: null },
  getActiveOrderStatsSuccess: { data: [] },
  getActiveOrderStatsFailure: { error: null },
  getArtisanActiveOrdersRequest: { cityId: null },
  getArtisanActiveOrdersSuccess: { data: [] },
  getArtisanActiveOrdersFailure: { error: null },
  getCourierPlanAndCountsRequest: {},
  getCourierPlanAndCountsSuccess: { data: [] },
  getCourierPlanAndCountsFailure: { error: null },
  getFoodCourierPlanAndCountsRequest: {},
  getFoodCourierPlanAndCountsSuccess: { data: [] },
  getFoodCourierPlanAndCountsFailure: { error: null },
  getArtisanCourierPlanAndCountsRequest: {},
  getArtisanCourierPlanAndCountsSuccess: { data: [] },
  getArtisanCourierPlanAndCountsFailure: { error: null },
  getCouriersRequest: { city: null, country: null, fields: [] },
  getCouriersSuccess: { data: [] },
  getCouriersFailure: { error: null },
  getRedBasket: {},
  getRedBasketSuccess: { data: {} },
  updateRedBasket: { redBasketData: [] },
  initPage: null,
  destroyPage: null,
  setWarehouseSearchTerm: { searchValue: '' },
}, { prefix: `${REDUX_KEY.ARTISAN.LIVE_MAP}_` });
