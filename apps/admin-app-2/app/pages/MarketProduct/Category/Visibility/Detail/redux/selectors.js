import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.DETAIL;

export const getMarketProductCategoryAvailableTimeSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategoryAvailableTime');
    },
    ({ data = {} }) => {
      return data || {};
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategoryAvailableTime');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const updateMarketProductCategoryAvailableTimeSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductCategoryAvailableTime');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};
