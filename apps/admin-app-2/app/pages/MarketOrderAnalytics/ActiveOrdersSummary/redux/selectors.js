import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getFormattedPromoStats } from '../utils';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

const reducerKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD;

export const executiveStatsSelector = {
  getData: createSelector(
    state => {
      return state[reducerKey].executiveStats.data;
    },
    data => data,
  ),
  getFormattedPromoData: createSelector(
    state => {
      return state[reducerKey].executiveStats.data?.promoStats;
    },
    stats => getFormattedPromoStats(stats),
  ),
  getFinancials: createSelector(
    state => {
      return state[reducerKey].executiveStats.data;
    },
    data => {
      const result = {
        totalOrder: data?.financialStats?.[0]?.totalOrderCount || 0,
        scheduledOrderCount: data?.financialStats?.[0]?.scheduledOrderCount || 0,
        totalDiscount: data?.promoOrderFinancialStats?.[0]?.totalDiscountAmount || 0,
        avgDiscount: data?.promoOrderFinancialStats?.[0]?.avgDiscountAmount || 0,
        avgBasket: data?.financialStats?.[0]?.avgBasketAmount || 0,
      };
      return result;
    },
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.executiveStats.isPending,
  ),
};

export const getChartFilters = createSelector(
  state => {
    return state[reducerKey];
  },
  s => s.chartFilters,
);

export const filtersSelector = {
  getAll: state => state[reducerKey]?.filters,
  getCity: state => state[reducerKey]?.filters?.city,
  getWarehouses: createSelector(
    state => state[reducerKey]?.filters?.warehouseIds,
    warehouses => warehouses,
  ),
  getIntegrationTypes: state => state[reducerKey]?.filters?.integrationTypes,
  getExcludedIntegrationTypes: state => state[reducerKey]?.filters?.excludedIntegrationTypes,
  getDomainType: state => state[reducerKey]?.filters?.domainType,
  getIsSlottedDelivery: state => state[reducerKey]?.filters?.isSlottedDelivery,
};

export const getFilteredWarehouses = createSelector(
  // get the common warehouse data and page specific filters
  getFilteredWarehousesSelector.getData,
  state => state[reducerKey]?.filters?.city,
  (warehouses, city) => {
    if (!city?.length) {
      return [];
    }
    // only show warehouses which has selected Field Managers
    return warehouses.filter(warehouse => {
      if (warehouse.city) {
        return warehouse.city === city;
      }
      return false;
    });
  },
);
