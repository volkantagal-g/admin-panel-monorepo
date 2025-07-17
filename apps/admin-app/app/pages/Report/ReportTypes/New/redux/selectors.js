import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.REPORTS.REPORT_TYPES_NEW;

export const getCreateReportType = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.createReportType.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.createReportType.isPending,
  ),
};

export const getAllReportTags = {
  getData: state => state[reducerKey].allReportTags.data,
  getIsPending: state => state[reducerKey].allReportTags.isPending,
};

export const getAllEmployees = {
  getData: state => state[reducerKey]?.allEmployees.data,
  getIsPending: state => state[reducerKey].allEmployees.isPending,
};
