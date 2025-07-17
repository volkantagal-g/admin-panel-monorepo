import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.RECIPES.SORT;
export const updateRecipeOrderBulkSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateRecipeOrderBulk');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateRecipeOrderBulk');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const toggleRecipeActivenessSwitchSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'toggleRecipeActivenessSwitch');
    },
    ({ data }) => {
      return data;
    },
  ),
};

export const getRecipeOrdersSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRecipeOrders');
    },
    ({ data = [] }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRecipeOrders');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
