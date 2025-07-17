import { REDUX_KEY } from '@shared/shared/constants';
import { formatMissingProductOrders } from '../utils';

const reducerKey = REDUX_KEY.MARKET_ORDER.MISSING_PRODUCTS;

export const getMissingProductOrdersSelector = {
  getData: state => {
    const missingOrders = state[reducerKey]?.getMissingProductOrders?.data || [];
    return formatMissingProductOrders(missingOrders);
  },
  getCount: state => state[reducerKey]?.getMissingProductOrders?.count,
  getIsPending: state => state[reducerKey]?.getMissingProductOrders?.isPending,
};

export const getOrderCancelReasonsSelector = {
  getData: state => state[reducerKey]?.getOrderCancelReasons?.data,
  getIsPending: state => state[reducerKey]?.getOrderCancelReasons?.isPending,
};

export const getMarketOrderSelector = {
  getData: state => state[reducerKey]?.getMarketOrder?.data,
  getIsPending: state => state[reducerKey]?.getMarketOrder?.isPending,

};

export const filtersSelector = {
  getSelectedDomainType: state => state[reducerKey]?.filters?.domainType,
  getSelectedCity: state => state[reducerKey]?.filters?.city,
  getPagination: state => state[reducerKey]?.filters?.pagination,
  getSearchTerm: state => state[reducerKey]?.filters?.searchTerm,
  getData: state => state[reducerKey]?.filters,
};
