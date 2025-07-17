import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.MARKET_PRODUCT_BRAND;

export const getBrandsSelector = {
  getData: state => state?.[reducerKey]?.brands?.data,
  getIsPending: state => state?.[reducerKey]?.brands?.isPending,
};
