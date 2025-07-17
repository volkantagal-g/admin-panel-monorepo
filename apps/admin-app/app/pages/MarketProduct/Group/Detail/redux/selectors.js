import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.GROUP.DETAIL;

export const getMarketProductGroupSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductGroup');
    },
    ({ data }) => {
      return data?.productGrouping || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductGroup');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const updateMarketProductGroupSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductGroup');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductGroup');
    },
    ({ error }) => {
      return error;
    },
  ),
};

export const copyMarketProductGroupSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'copyMarketProductGroup');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const deleteMarketProductGroupSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'deleteMarketProductGroup');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const getProductsOfProductGroupSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getProductsOfProductGroup');
    },
    ({ data }) => {
      return data?.products || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getProductsOfProductGroup');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};
