import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.SORT;
export const updateCategoryOrderBulkSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateCategoryOrderBulk');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateCategoryOrderBulk');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const toggleCategoryActivenessSwitchSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'toggleCategoryActivenessSwitch');
    },
    ({ data }) => {
      return data;
    },
  ),
};

export const toggleCategoryListablesSwitchSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'toggleCategoryListablesSwitch');
    },
    ({ data }) => {
      return data;
    },
  ),
};

export const getCategoryOrdersSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getCategoryOrders');
    },
    ({ data = [] }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getCategoryOrders');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
