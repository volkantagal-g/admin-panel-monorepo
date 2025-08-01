import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.REPORTS.REPORT_TYPES_DETAIL}_`;

export const { Types, Creators } = createActions(
  {
    setFormMode: { formMode: null },
    getReportTypeByIdRequest: { id: null },
    getReportTypeByIdSuccess: { data: null },
    getReportTypeByIdFailure: { error: null },

    updateReportTypeRequest: { data: null, prevTags: null, updateMessageMap: null },
    updateReportTypeFailure: { error: null },
    setUpdateRequestNotPending: null,

    getAllReportTagsRequest: { data: null },
    getAllReportTagsSuccess: { data: null },
    getAllReportTagsFailure: { error: null },

    getReportTypeReportTagsRequest: { id: null },
    getReportTypeReportTagsSuccess: { data: null },
    getReportTypeReportTagsFailure: { error: null },

    deleteReportTypeRequest: { id: null },
    deleteReportTypeSuccess: { data: null },
    deleteReportTypeFailure: { error: null },

    getAllEmployeesRequest: { data: null },
    getAllEmployeesSuccess: { data: null },
    getAllEmployeesFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
