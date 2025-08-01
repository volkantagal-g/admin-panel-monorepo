import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.REPORTS.REPORTS}_`;

export const { Types, Creators } = createActions(
  {
    getMyReportTypesRequest: { data: null },
    getMyReportTypesSuccess: { data: null },
    getMyReportTypesFailure: { error: null },

    getMyReportsRequest: { data: null },
    getMyReportsSuccess: { data: null, nextPageToken: '', prevPageToken: '' },
    getMyReportsFailure: { error: null },
    setFilters: { filters: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
