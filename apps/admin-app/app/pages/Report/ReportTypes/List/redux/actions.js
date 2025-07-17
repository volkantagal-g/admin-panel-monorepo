import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.REPORTS.REPORT_TYPES}_`;

export const { Types, Creators } = createActions(
  {
    getReportTypesRequest: { data: null },
    getReportTypesSuccess: { data: null },
    getReportTypesFailure: { error: null },

    getAllReportTagsRequest: { data: null },
    getAllReportTagsSuccess: { data: null },
    getAllReportTagsFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
