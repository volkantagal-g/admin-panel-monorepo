import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.MARKET_PRODUCT_CATEGORY;

export const getMarketProductCategoriesSelector = {
  getData: state => state?.[reducerKey]?.marketProductCategories?.data,
  getIsPending: state => state?.[reducerKey]?.marketProductCategories?.isPending,
};
