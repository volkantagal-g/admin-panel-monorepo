import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CODE_BULK;

export const codeBulkEditSelector = {
  getData: createSelector(
    state => state[reducerKey]?.codeBulkEdit,
    ({ data }) => data || {},
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.codeBulkEdit,
    ({ isPending }) => isPending,
  ),
};
