import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.REPORTS.REPORT_TYPES_NEW}_`;

export const { Types, Creators } = createActions(
  {
    createReportTypeRequest: { data: null },
    createReportTypeSuccess: { data: null },
    createReportTypeFailure: { error: null },

    getAllReportTagsRequest: { data: null },
    getAllReportTagsSuccess: { data: null },
    getAllReportTagsFailure: { error: null },

    getAllEmployeesRequest: { data: null },
    getAllEmployeesSuccess: { data: null },
    getAllEmployeesFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
