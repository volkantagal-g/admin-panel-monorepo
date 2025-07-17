import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.BADGE.DETAIL;

export const getBadgeSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getBadge');
    },
    ({ data }) => {
      return data || {};
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getBadge');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const updateBadgeSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateBadge');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const updateBadgeImageUrlSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateBadgeImageUrl');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};
