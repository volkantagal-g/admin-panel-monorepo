import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.REPORTS.REPORTS;

export const getMyReportTypes = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.getMyReportTypes.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getMyReportTypes.isPending,
  ),
};

export const getMyReports = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.getMyReports.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getMyReports.isPending,
  ),
  getPagination: createSelector(
    state => state[reducerKey],
    state => (
      {
        next: state.getMyReports.nextPageToken,
        prev: state.getMyReports.prevPageToken,
      }
    ),
  ),
};

export const getFiltersSelector = state => state[reducerKey].filters;
