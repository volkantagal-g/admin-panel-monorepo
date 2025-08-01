import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.REPORTS.REPORT_TAGS_NEW;

export const getCreateReportTags = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.createReport.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.createReport.isPending,
  ),
};
