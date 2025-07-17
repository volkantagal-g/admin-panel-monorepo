import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  filterLockedTimesheetsRequest: { minDate: undefined, maxDate: undefined, countryCode: undefined },
  filterLockedTimesheetsSuccess: { data: [] },
  filterLockedTimesheetsFailure: { error: null },

  lockTimesheetsRequest: { dates: undefined, countryCode: undefined },
  lockTimesheetsSuccess: null,
  lockTimesheetsFailure: { error: null },

  unlockTimesheetsRequest: { dates: undefined, countryCode: undefined },
  unlockTimesheetsSuccess: null,
  unlockTimesheetsFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TIMESHEET_LOCK}_` });
