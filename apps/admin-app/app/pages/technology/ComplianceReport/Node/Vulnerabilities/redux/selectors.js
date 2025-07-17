import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TECHNOLOGY.COMPLIANCE_REPORT.NODE.VULNERABILITIES;

export const repositoriesSelector = {
  getData: createSelector(
    state => state[reducerKey].repositories,
    ({ data }) => data,
  ),
  isPending: createSelector(
    state => state[reducerKey].repositories,
    ({ isPending }) => isPending,
  ),
};
