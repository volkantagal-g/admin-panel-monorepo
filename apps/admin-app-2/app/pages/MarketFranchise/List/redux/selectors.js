import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY, STORE_CONVERSION_MARKET_FRANCHISE_TYPE } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.LIST;

export const marketFranchisesSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'marketFranchises'),
    ({ data = [] }) => data
  ),
  getTotal: createSelector(
    state => getStateObject(state, reducerKey, 'marketFranchises'),
    ({ total }) => total
  ),
  getPureFranchises: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchises');
    },
    ({ data = [] }) => {
      return data;
    }
  ),
  getStoreConversionFranchises: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchises');
    },
    ({ data = [] }) => {
      return data.filter(item => {
        return item.franchiseType === STORE_CONVERSION_MARKET_FRANCHISE_TYPE;
      });
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchises');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
