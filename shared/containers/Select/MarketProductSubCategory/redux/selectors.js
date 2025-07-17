import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.MARKET_PRODUCT_SUB_CATEGORY;

export const getMarketProductSubCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductSubCategories');
    },
    ({ data }) => {
      return data || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductSubCategories');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
