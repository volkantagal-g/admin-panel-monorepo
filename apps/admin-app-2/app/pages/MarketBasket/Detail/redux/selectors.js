import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.MARKET_BASKET.DETAIL;

export const marketBasketSelector = {
  getIsPending: state => state[reduxKey]?.getMarketBasket?.isPending,
  getData: state => state[reduxKey]?.getMarketBasket?.data,
  getCancelIsPending: state => state[reduxKey]?.cancelMarketBasket?.isPending,
};
