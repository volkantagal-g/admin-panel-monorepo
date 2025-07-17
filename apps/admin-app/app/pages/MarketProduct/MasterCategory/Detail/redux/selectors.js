import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.MASTER_CATEGORY.DETAIL;

export const getMarketProductMasterCategorySelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductMasterCategory');
    },
    ({ data }) => {
      return data || {};
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductMasterCategory');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const updateMarketProductMasterCategorySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductMasterCategory');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductMasterCategory');
    },
    ({ error }) => {
      return error;
    }
  ),
};

export const getChildrenOfMarketProductMasterCategorySelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getChildrenOfMarketProductMasterCategory');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getChildrenOfMarketProductMasterCategory');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
