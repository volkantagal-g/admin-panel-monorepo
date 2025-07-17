import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getSummaryRequest: { },
  getSummarySuccess: { data: [] },
  getSummaryFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TECHNOLOGY.COMPLIANCE_REPORT.HOME}_` });
