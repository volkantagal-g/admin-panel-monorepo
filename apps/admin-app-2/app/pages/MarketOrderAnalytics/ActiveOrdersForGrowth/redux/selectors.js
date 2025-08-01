import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getFormattedData } from '../utils';

const reducerKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_GROWTH;

export const getFormattedOrdersForGrowthData = {
  getData: createSelector(
    state => {
      // return getStateObject(state, reducerKey, 'activeOrdersForGrowthData');
      return state[reducerKey].activeOrdersForGrowthData.data.orders;
    },
    orderData => getFormattedData(orderData),
  ),
  getCount: state => state[reducerKey].activeOrdersForGrowthData.data.count,
  getIsPending: state => state[reducerKey].activeOrdersForGrowthData.isPending,
};

export const activePromoDataSelector = {
  getData: state => state[reducerKey].activePromoData.data,
  getIsPending: state => state[reducerKey].activePromoData.isPending,
};

export const filtersSelector = {
  getSelectedCities: state => state[reducerKey]?.filters?.cities,
  getSelectedDomainType: state => state[reducerKey]?.filters?.domainType,
  getSelectedWarehouses: state => state[reducerKey]?.filters?.warehouses,
  getSelectedSlottedState: state => state[reducerKey]?.filters?.slottedState,
  getSelectedOrderStatuses: state => state[reducerKey]?.filters?.orderStatuses,
  getSelectedPromos: state => state[reducerKey]?.filters?.promos,
  getSelectedPaymentMethods: state => state[reducerKey]?.filters?.paymentMethods,
  getPagination: state => state[reducerKey]?.filters?.pagination,
  getIntegrationTypes: state => state[reducerKey]?.filters?.integrationTypes,
  getExcludedIntegrationTypes: state => state[reducerKey]?.filters?.excludedIntegrationTypes,
  getSortOptions: state => state[reducerKey]?.filters?.sortOptions,
};
