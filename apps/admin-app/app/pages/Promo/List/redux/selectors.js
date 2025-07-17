import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PROMO.LIST;

export const getPromosSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'promos');
    },
    ({ data }) => {
      return data;
    },
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'promos');
    },
    ({ totalCount }) => {
      return totalCount || 10000;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'promos');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
