import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.REPORTS.REPORTS_NEW;

export const getReportType = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportType.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportType.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.reportType.error,
  ),
};

export const getCreateReport = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.createReport.isPending,
  ),
};
