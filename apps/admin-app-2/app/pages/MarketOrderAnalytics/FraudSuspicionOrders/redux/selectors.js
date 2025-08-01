import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.FRAUD_SUSPICION_ORDERS;

export const getFraudSuspicionOrdersSelector = {
  getData: state => state[reducerKey]?.getFraudSuspicionOrders.data,
  getCount: state => state[reducerKey]?.getFraudSuspicionOrders.count,
  getIsPending: state => state[reducerKey]?.getFraudSuspicionOrders.isPending,
};

export const filtersSelector = {
  getSelectedDomainType: state => state[reducerKey]?.filters.domainType,
  getPagination: state => state[reducerKey]?.filters.pagination,

};
