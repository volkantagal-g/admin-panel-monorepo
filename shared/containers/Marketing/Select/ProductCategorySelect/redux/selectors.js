import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKETING.SELECT.PRODUCT_CATEGORY;

export const marketProductCategorySelector = {
  getData: state => state?.[reducerKey]?.data,
  getIsPending: state => state?.[reducerKey]?.isPending,
  getError: state => state?.[reducerKey]?.error,
};
