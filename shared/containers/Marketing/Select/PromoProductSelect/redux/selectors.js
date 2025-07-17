import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PROMO.PRODUCT_SELECT;

export const marketProductSelector = {
  getData: state => state?.[reducerKey]?.data,
  getMarketProductsMap: state => state?.[reducerKey]?.map,
  getIsPending: state => state?.[reducerKey]?.isPending,
  getError: state => state?.[reducerKey]?.error,
};
