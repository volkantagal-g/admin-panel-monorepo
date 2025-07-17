import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.SUB_CATEGORY.SORT;

export const getSubCategoryPositionsSelector = {
  getData: state => state?.[reducerKey]?.getSubCategoryPositions?.data,
  getIsPending: state => state?.[reducerKey]?.getSubCategoryPositions?.isPending,
};

export const updateSubCategoryOrderBulkSelector = {
  getData: state => state?.[reducerKey]?.updateSubCategoryOrderBulk?.data,
  getIsPending: state => state?.[reducerKey]?.updateSubCategoryOrderBulk?.isPending,
};
