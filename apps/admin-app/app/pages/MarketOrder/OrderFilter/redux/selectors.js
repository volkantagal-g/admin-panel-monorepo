import { createSelector } from 'reselect';
import get from 'lodash/get';

import { GETIR_DOMAIN_TYPES, REDUX_KEY } from '@shared/shared/constants';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { getDomainBasedOrderCount } from '../utils';

const reducerKey = REDUX_KEY.MARKET_ORDER.ORDER_FILTER;

export const getFilteredOrdersSelector = {
  getData: state => {
    const orders = state[reducerKey]?.getFilteredOrders?.data;
    return orders.map(order => {
      const sucOrderCounts = get(order, 'client.client.sucOrderCounts', []);
      const domainOrderCount = getDomainBasedOrderCount(sucOrderCounts);
      return {
        ...order,
        sucMarketOrderCount: domainOrderCount?.[GETIR_DOMAIN_TYPES.MARKET] ?? 0,
        sucGetirVoyagerOrderCount: domainOrderCount?.[GETIR_DOMAIN_TYPES.VOYAGER] ?? 0,
        sucFoodOrderCount: domainOrderCount?.[GETIR_DOMAIN_TYPES.FOOD] ?? 0,
        sucG10OrderCount: domainOrderCount?.[GETIR_DOMAIN_TYPES.GETIR10] ?? 0,
      };
    });
  },
  getCount: state => state[reducerKey]?.getFilteredOrders.count,
  getIsPending: state => state[reducerKey]?.getFilteredOrders.isPending,
};

export const filtersSelector = {
  getSelectedDomainType: state => state[reducerKey]?.filters.domainType,
  getSelectedCity: state => state[reducerKey]?.filters.city,
  getPagination: state => state[reducerKey]?.filters.pagination,
  getSelectedDateRange: state => state[reducerKey]?.filters.selectedDateRange,
  getWarehouse: state => state[reducerKey]?.filters.warehouse,
  getStatus: state => state[reducerKey]?.filters.status,
  getErrorCode: state => state[reducerKey]?.filters.errorCode,
  getPlatforms: state => state[reducerKey]?.filters.platforms,
  getData: state => state[reducerKey]?.filters,
};

export const lastUsedFiltersSelector = state => state[reducerKey]?.lastUsedFilters;

export const getFilteredWarehousesSelector = {
  getData: createSelector(
    getWarehousesSelector.getData,
    state => state?.[reducerKey].filters.city,
    (warehouses, city) => {
      if (!city) {
        return warehouses;
      }
      return warehouses.filter(warehouse => warehouse?.city?._id === city);
    },
  ),
};
