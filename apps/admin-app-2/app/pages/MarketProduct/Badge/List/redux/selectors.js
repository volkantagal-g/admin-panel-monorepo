import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.BADGE.LIST;

const DEFAULT_ARRAY = [];
const DEFAULT_OBJECT = {};

export const getBadgesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getBadges');
    },
    ({ data }) => {
      return data || DEFAULT_ARRAY;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getBadges');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const getMarketProductBadgesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductBadges');
    },
    ({ data }) => {
      return data || DEFAULT_ARRAY;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductBadges');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const selectedBadgeSelector = { getData: state => state?.[reducerKey]?.selectedBadge?.data || DEFAULT_OBJECT };

export const updateMarketProductBadgesBulkSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductBadgesBulk');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};
