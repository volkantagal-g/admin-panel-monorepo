import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.RECONCILIATION_DAILY_REPORT.LIST}_`;

export const { Types, Creators } = createActions({
  getDailyReportRequest: {
    page: 1,
    pageSize: 25,
    reportCheckStartDate: null,
    reportCheckEndDate: null,
    reportRequestEndDate: null,
    reportRequestStartDate: null,
    sourceOfStatements: [],
    domainTypes: [],
  },
  getDailyReportSuccess: { data: [], totalCount: 0 },
  getDailyReportFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
