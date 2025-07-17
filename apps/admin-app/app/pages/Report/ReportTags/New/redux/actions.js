import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.REPORTS.REPORT_TAGS_NEW}_`;

export const { Types, Creators } = createActions(
  {
    createReportTagRequest: { data: null },
    createReportTagSuccess: { data: null },
    createReportTagFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
