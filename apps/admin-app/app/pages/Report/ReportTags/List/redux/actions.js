import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.REPORTS.REPORT_TAGS}_`;

export const { Types, Creators } = createActions(
  {
    getReportTagsRequest: { data: null },
    getReportTagsSuccess: { data: null },
    getReportTagsFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
