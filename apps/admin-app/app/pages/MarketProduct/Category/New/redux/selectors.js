import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.NEW;

export const getMarketProductCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategories');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategories');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const createMarketProductCategorySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createMarketProductCategory');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};
