import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GL_RUNNER_NEW;

export const createRunnerSelector = {
  getIsPending: createSelector(
    state => state?.[reducerKey]?.createRunner,
    ({ isPending }) => isPending,
  ),
};
