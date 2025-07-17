import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.REPORTS.REPORT_TAGS;

export const getReportTags = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportTags.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportTags.isPending,
  ),
};
