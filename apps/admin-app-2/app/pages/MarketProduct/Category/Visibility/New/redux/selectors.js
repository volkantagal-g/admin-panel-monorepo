import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.NEW;

export const createMarketProductCategoryAvailableTimeSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createMarketProductCategoryAvailableTime');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};
