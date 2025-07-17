import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.CHAIN_RESTAURANT;

export const getChainRestaurantsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getChainRestaurantsByName');
    },
    ({ data }) => data
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getChainRestaurantsByName');
    },
    ({ isPending }) => isPending
  ),
};