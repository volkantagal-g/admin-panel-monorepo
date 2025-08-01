import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.MARKET_BASKET.LIST;

export const marketBasketsSelector = {
  getIsPending: state => state[reduxKey].getMarketBaskets.isPending,
  getData: state => state[reduxKey].getMarketBaskets.data,
};

export const filterSelector = { getFilters: state => state[reduxKey].filters };
