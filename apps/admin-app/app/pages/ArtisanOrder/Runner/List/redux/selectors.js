import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GL_RUNNER_LIST;
const runnersSelector = state => state?.[reducerKey]?.getRunners;

export const getRunnersSelector = {
  getData: createSelector(
    runnersSelector,
    ({ data }) => data,
  ),
  getPagination: createSelector(
    runnersSelector,
    ({ pagination }) => pagination,
  ),
  getIsPending: createSelector(
    runnersSelector,
    ({ isPending }) => isPending,
  ),
};
