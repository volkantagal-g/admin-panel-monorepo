import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.ORDER_COUNTER;

export const filtersSelector = { getOrderType: state => state[reduxKey]?.filters?.orderType };

export const totalOrderCountsDataSelector = {
  getIsPending: state => state[reduxKey]?.totalOrderCounts?.isPending,
  getData: state => state[reduxKey]?.totalOrderCounts?.data,
};
