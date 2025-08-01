import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.LIST;

export const getMarketProductCategoryAvailableTimesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategoryAvailableTimes');
    },
    ({ data = [] }) => {
      return data || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategoryAvailableTimes');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const deleteMarketProductCategoryAvailableTimesSelector = {
  getIsPending: state => state?.[reducerKey]?.deleteMarketProductCategoryAvailableTimes?.isPending,
  getError: state => state?.[reducerKey]?.deleteMarketProductCategoryAvailableTimes?.error,
};
