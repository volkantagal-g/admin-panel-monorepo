import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.TIP_PAYBACK.SUMMARY_LIST}_`;

export const { Types, Creators } = createActions({
  getSummariesRequest: {
    startDate: null,
    finishDate: null,
    sort: null,
    pageNo: 1,
    pageSize: 25,
  },
  getSummariesSuccess: { data: [] },
  getSummariesFailure: { error: null },

  cancelPayoutRequest: { id: null, filters: null },
  cancelPayoutSuccess: { data: [], id: null },
  cancelPayoutFailure: { id: null },

  payoutRequest: { id: null, filters: null },
  payoutSuccess: { data: [], id: null },
  payoutFailure: { id: null },

  statusUpdateRequest: { id: null, filters: null },
  statusUpdateSuccess: { data: [], id: null },
  statusUpdateFailure: { id: null },

  calculateRequest: { finishDate: null, startDate: null },
  calculateSuccess: { data: [] },
  calculateFailure: { error: null },

  triggerReportRequest: { id: null, filters: null },
  triggerReportSuccess: { data: [], id: null },
  triggerReportFailure: { id: null },

  initPage: null,

  destroyPage: null,
}, { prefix });
