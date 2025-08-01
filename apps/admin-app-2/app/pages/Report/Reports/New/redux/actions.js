import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.REPORTS.REPORTS_NEW}_`;

export const { Types, Creators } = createActions(
  {
    getReportTypeByIdRequest: { id: null },
    getReportTypeByIdSuccess: { data: null },
    getReportTypeByIdFailure: { error: null },

    createReportRequest: { data: null, shouldStayInTheSamePage: false },
    createReportSuccess: { data: null },
    createReportFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
