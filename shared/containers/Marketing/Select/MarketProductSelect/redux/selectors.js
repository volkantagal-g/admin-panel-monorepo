import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKETING.SELECT.MARKET_PRODUCT;

export const marketProductSelector = {
  getData: state => state?.[reducerKey]?.data,
  getMarketProductsMap: state => state?.[reducerKey]?.map,
  getIsPending: state => state?.[reducerKey]?.isPending,
  getError: state => state?.[reducerKey]?.error,
};
