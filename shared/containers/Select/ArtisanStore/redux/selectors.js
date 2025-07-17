import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.ARTISAN_STORE;

export const getArtisanStoresByNameSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getArtisanStoresByName');
    },
    ({ data }) => data || [],
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getArtisanStoresByName');
    },
    ({ isPending }) => isPending,
  ),
};
