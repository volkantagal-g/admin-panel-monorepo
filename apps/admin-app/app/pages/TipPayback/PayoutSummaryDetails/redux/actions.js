import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.TIP_PAYBACK.SUMMARY_DETAILS}_`;

export const { Types, Creators } = createActions({
  getSummaryDetailsRequest: {
    id: null,
    pageNo: 1,
    pageSize: 25,
    personName: null,
    payoutStatus: null,
    sort: null,
    person: null,
    taxNum: null,
  },
  getSummaryDetailsSuccess: { data: [] },
  getSummaryDetailsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
