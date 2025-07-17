import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.REPORTS.REPORT_TYPES_DETAIL;

export const getFormMode = createSelector(
  state => state[reducerKey],
  state => state.formMode,
);

export const getReportType = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportType.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportType.isPending,
  ),
};

export const getReportTypeUpate = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateReportType.isPending,
  ),
};

export const getDeleteReportType = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.deleteReportType.isPending,
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

export const getReportTypeReportTags = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportTypeReportTags.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportTypeReportTags.isPending,
  ),
};

export const getAddReportTagsToReportType = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.addReportTags.isPending,
  ),
};

export const getReportTagsForTheReportType = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportTypeReportTagIds.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportTypeReportTagIds.isPending,
  ),
};

export const getReportTagsDetails = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportTypeReportTags.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportTypeReportTags.isPending,
  ),
};

export const getRemoveReportTagFromReportType = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.removeReportTag.isPending,
  ),
};

export const getAllEmployees = {
  getData: state => state[reducerKey]?.allEmployees?.data,
  getIsPending: state => state[reducerKey].allEmployees.isPending,
};
