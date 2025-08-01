import { createSelector } from 'reselect';
import _ from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';
import { getFormattedData } from '../utils';

const reducerKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_MANAGEMENT;

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
  getTotalKuzeydenCarboyCount: createSelector(
    state => {
      return state[reducerKey];
    },
    state => state.activeOrdersData.data.totalKuzeydenCarboyCount,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.activeOrdersData.isPending,
  ),
};

export const clientSearchSelector = {
  getClients: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'clientSearchData');
    },
    clientSearchData => clientSearchData.data.clients,
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'clientSearchData');
    },
    clientSearchData => clientSearchData.isPending,
  ),
  getLastDataFetchDate: state => state[reducerKey].clientSearchData.lastDataFetchDate,
};

export const getSubmittedFilters = state => state[reducerKey]?.submittedFilters;

export const getSortOptions = createSelector(
  state => state[reducerKey],
  state => state.sortOptions,
);

export const getPagination = createSelector(
  state => {
    return getStateObject(state, reducerKey, 'pagination');
  },
  paginationData => {
    return paginationData;
  },
);

const activeOrderStatsSelector = state => getStateObject(state, reducerKey, 'activeOrderStatsData');

const orderStatsTotalPromoOrderCountSelector = createSelector(
  activeOrderStatsSelector,
  activeOrderStatsData => {
    const promoOrderFinancialStatsObj = _.get(activeOrderStatsData, ['data', 'promoOrderFinancialStats', 0], {});
    return _.get(promoOrderFinancialStatsObj, 'totalOrderCount', 0);
  },
);

const orderStatsFinancialStatsSelector = createSelector(
  activeOrderStatsSelector,
  activeOrderStatsData => {
    return _.get(activeOrderStatsData, ['data', 'financialStats', 0], {});
  },
);

const orderStatsTotalOrderCountSelector = createSelector(
  orderStatsFinancialStatsSelector,
  financialStatsData => {
    return _.get(financialStatsData, 'totalOrderCount', 0);
  },
);

export const orderStatsSelector = {
  getPromoOrderRatio: createSelector(
    orderStatsTotalOrderCountSelector,
    orderStatsTotalPromoOrderCountSelector,
    (totalOrderCount, totalPromoOrderCount) => {
      if (totalOrderCount > 0) {
        return totalPromoOrderCount / totalOrderCount;
      }
      return 0;
    },
  ),
  getAverageBasketAmount: createSelector(
    orderStatsFinancialStatsSelector,
    financialStatsData => {
      return _.get(financialStatsData, 'avgBasketAmount', 0);
    },
  ),
  getAverageChargedAmount: createSelector(
    orderStatsFinancialStatsSelector,
    financialStatsData => {
      return _.get(financialStatsData, 'avgChargedAmount', 0);
    },
  ),
  getIsPending: createSelector(
    activeOrderStatsSelector,
    activeOrderStatsData => {
      return _.get(activeOrderStatsData, 'isPending', false);
    },
  ),
};
