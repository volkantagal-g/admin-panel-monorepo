import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.LOCALS_CHAIN;

export const getLocalsChainSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLocalsChains');
    },
    ({ data }) => data || [],
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLocalsChains');
    },
    ({ isPending }) => isPending,
  ),
};
