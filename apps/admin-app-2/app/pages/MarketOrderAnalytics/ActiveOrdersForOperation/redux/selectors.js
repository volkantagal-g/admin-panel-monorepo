import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { getFormattedData } from '../utils';

const reducerKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_OPERATION;

export const getFormattedOrderData = {
  getData: createSelector(
    state => {
      return state[reducerKey].activeOrdersData.data.orders;
    },
    orderData => getFormattedData(orderData),
  ),
  getCount: createSelector(
    state => {
      return state[reducerKey];
    },
    state => state.activeOrdersData.data.count,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.activeOrdersData.isPending,
  ),
  getTotalKuzeydenCarboyCount: createSelector(
    state => state[reducerKey],
    state => state.activeOrdersData.data.totalKuzeydenCarboyCount,
  ),
};

export const getActiveOrderStats = {
  getData: createSelector(
    state => {
      return state[reducerKey];
    },
    state => state.getActiveOrderStats.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getActiveOrderStats.isPending,
  ),
};

export const getFilteredWarehouses = createSelector(
  // get the common warehouse data and page specific filters
  getFilteredWarehousesSelector.getData,
  state => getStateObject(state, reducerKey, 'filters').fieldManagers,
  (warehouses, fieldManagers) => {
    if (!fieldManagers?.length) {
      return warehouses;
    }
    // only show warehouses which has selected Field Managers
    return warehouses.filter(warehouse => {
      if (warehouse.fieldManagers?.length) {
        return warehouse.fieldManagers.some(managerId => fieldManagers.includes(managerId));
      }
      return false;
    });
  },
);

export const getFilteredFieldManagers = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.fieldManagersData.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.fieldManagersData.isPending,
  ),
};

export const filtersSelector = {
  getCity: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ city }) => {
      return city;
    },
  ),
  getDomainType: state => state[reducerKey]?.filters?.domainType,
  getFieldManagers: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ fieldManagers }) => {
      return fieldManagers;
    },
  ),
  getCourierId: createSelector(
    state => state[reducerKey],
    state => state?.filters?.courierId,
  ),
  getWarehouses: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ warehouses }) => {
      return warehouses;
    },
  ),
  getIsSlottedDelivery: state => state[reducerKey]?.filters?.isSlottedDelivery,
  getOrderStatus: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ orderStatus }) => {
      return orderStatus;
    },
  ),
  getOrderStatusMoreThan: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ orderStatusMoreThan }) => {
      return orderStatusMoreThan;
    },
  ),
  getPagination: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ pagination }) => {
      return pagination;
    },
  ),
  getSortOptions: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ sortOptions }) => {
      return sortOptions;
    },
  ),
  getIntegrationTypes: state => state[reducerKey]?.filters?.integrationTypes,
  getExcludedIntegrationTypes: state => state[reducerKey]?.filters?.excludedIntegrationTypes,
};

export const getCourierSearch = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.courierData?.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.courierData?.isPending,
  ),
};
