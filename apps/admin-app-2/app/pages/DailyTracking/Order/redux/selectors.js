import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { calculateWarehouseData, calculateRateCount } from '../util';
import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';

const reducerKey = REDUX_KEY.DAILY_TRACKING.ORDER;

export const warehouseStatsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseStats', 'data');
    },
    ({ data }) => calculateWarehouseData(data),
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseStats', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const orderPromoDistributionBetweenDatesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderPromoDistributionBetweenDates', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderPromoDistributionBetweenDates', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const redBasketCountsSelector = {
  getData: createSelector(
    state => state[reducerKey]?.redBasketCounts?.data,
    ({ redBasketCount }) => {
      return redBasketCount;
    },
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.redBasketCounts?.isPending,
    isPending => {
      return isPending;
    },
  ),
};

export const rateCountsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'rateCounts', 'data');
    },
    ({ data }) => calculateRateCount(data),
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'rateCounts', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const filtersSelector = {
  getSelectedDomainType: createSelector(
    availableDomainTypesForCountrySelector.getDomainTypes,
    state => state[reducerKey]?.filters?.selectedDomainType,
    (availableDomainTypes, domainType) => {
      if (!availableDomainTypes?.includes(domainType)) return GETIR_10_DOMAIN_TYPE;
      return domainType;
    },
  ),
};
