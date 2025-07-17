import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.APP_LAYOUT;

export const getPageOwners = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.pageOwners.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.pageOwners.isPending,
  ),
};
