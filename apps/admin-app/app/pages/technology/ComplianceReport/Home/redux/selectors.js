import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TECHNOLOGY.COMPLIANCE_REPORT.HOME;

export const summarySelector = {
  getData: createSelector(
    state => state[reducerKey].summary,
    ({ data }) => data,
  ),
  isPending: createSelector(
    state => state[reducerKey].summary,
    ({ isPending }) => isPending,
  ),
};
