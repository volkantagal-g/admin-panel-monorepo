import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.REPORTS.REPORT_TYPES;

export const getReportTypes = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportTypes.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportTypes.isPending,
  ),
};

export const getAllReportTags = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.allReportTags.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.allReportTags.isPending,
  ),
};
