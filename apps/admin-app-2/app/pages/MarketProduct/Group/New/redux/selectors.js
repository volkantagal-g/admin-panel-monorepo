import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.GROUP.NEW;

export const createMarketProductGroupSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createMarketProductGroup');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};
