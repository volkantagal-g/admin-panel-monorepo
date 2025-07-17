import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.MASTER_CATEGORY.NEW;

export const createMarketProductMasterCategorySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createMarketProductMasterCategory');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
