import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DAILY_SUMMARY.FOUNDERS_CUSTOM}_`;

export const { Types, Creators } = createActions({
  triggerDataRefresh: { currentTime: null },
  setDataFilter: { filterKey: null, filterValue: null, currentTime: null },
  setCurrency: { currency: null },
  setLastSuccessfulDateRanges: { dateRanges: null },
  getGlobalDailySummaryDataRequest: { config: null, tableKey: null, dateRanges: null },
  getGlobalDailySummaryDataSuccess: { config: null, tableKey: null, data: null },
  getGlobalDailySummaryDataFailure: { config: null, tableKey: null, error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
