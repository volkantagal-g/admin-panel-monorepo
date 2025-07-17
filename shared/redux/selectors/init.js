import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

export const getIsAfterLoginInitFinished = createSelector(
  state => {
    return state[REDUX_KEY.INIT].isAfterLoginInitFinished;
  },
  val => val,
);

export const getIsAfterLoginInitFailed = createSelector(
  state => {
    return state[REDUX_KEY.INIT].isAfterLoginInitFailed;
  },
  val => val,
);
