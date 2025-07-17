import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BRAND.DETAIL;

export const getBrandSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getBrand');
    },
    ({ data }) => {
      return data || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getBrand');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const updateBrandSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateBrand');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateBrand.error,
  ),
};

export const activateBrandSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'activateBrand');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const deactivateBrandSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'deactivateBrand');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};
