import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.SORT;

export const getProductPositionsByCategorySelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getProductPositionsByCategory');
    },
    ({ data = [] }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getProductPositionsByCategory');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const updateProductPositionsBulkSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateProductPositionsBulk');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateProductPositionsBulk');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const toggleCategoryActivenessSwitchSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'toggleCategoryActivenessSwitch');
    },
    ({ data }) => {
      return data;
    }
  ),
};
