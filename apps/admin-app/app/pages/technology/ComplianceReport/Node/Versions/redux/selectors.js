import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TECHNOLOGY.COMPLIANCE_REPORT.NODE.VERSIONS;

export const nodeVersionsSelector = {
  getData: createSelector(
    state => state[reducerKey].nodeVersions,
    ({ data }) => data,
  ),
  isPending: createSelector(
    state => state[reducerKey].nodeVersions,
    ({ isPending }) => isPending,
  ),
};
