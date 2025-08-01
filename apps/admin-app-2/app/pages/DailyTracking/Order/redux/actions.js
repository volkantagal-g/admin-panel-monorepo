import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const params = {
  startDate: null,
  endDate: null,
  domainType: '',
  countries: [],
  cities: [],
};

export const { Types, Creators } = createActions({
  getWarehouseStatsRequest: { ...params },
  getWarehouseStatsSuccess: { data: [] },
  getWarehouseStatsFailure: { error: null },
  getOrderPromoDistributionBetweenDatesRequest: { ...params },
  getOrderPromoDistributionBetweenDatesSuccess: { data: [] },
  getOrderPromoDistributionBetweenDatesFailure: { error: null },
  getRedBasketCountsRequest: { ...params },
  getRedBasketCountsSuccess: { data: {} },
  getRedBasketCountsFailure: { error: null },
  getRateCountsRequest: { ...params },
  getRateCountsSuccess: { data: [] },
  setSelectedDomainType: { selectedDomainType: '' },
  getRateCountsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.DAILY_TRACKING.ORDER}_` });
