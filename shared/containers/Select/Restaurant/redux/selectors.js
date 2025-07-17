import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.RESTAURANT;

export const getRestaurantsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRestaurantsByName');
    },
    ({ data }) => data
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRestaurantsByName');
    },
    ({ isPending }) => isPending
  ),
};