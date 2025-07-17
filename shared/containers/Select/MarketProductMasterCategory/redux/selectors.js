import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.MARKET_PRODUCT_MASTER_CATEGORY;

export const getMarketProductMasterCategoriesSelector = {
  getData: state => state?.[reducerKey]?.marketProductMasterCategories?.data,
  getIsPending: state => state?.[reducerKey]?.marketProductMasterCategories?.isPending,
};
