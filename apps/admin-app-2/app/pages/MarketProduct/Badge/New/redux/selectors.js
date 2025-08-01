import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.BADGE.NEW;

export const createBadgeSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createBadge');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};
