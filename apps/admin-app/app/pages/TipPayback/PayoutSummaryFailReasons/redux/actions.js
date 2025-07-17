import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.TIP_PAYBACK.SUMMARY_FAIL_REASONS}_`;

export const { Types, Creators } = createActions({
  getSummaryFailReasonsRequest: {
    id: null,
    personName: null,
    sort: null,
    pageNo: 1,
    pageSize: 25,
    person: null,
    taxNum: null,
  },
  getSummaryFailReasonsSuccess: { data: [] },
  getSummaryFailReasonsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
