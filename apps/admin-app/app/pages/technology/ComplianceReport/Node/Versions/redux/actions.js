import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getNodeVersionsRequest: { },
  getNodeVersionsSuccess: { data: [] },
  getNodeVersionsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TECHNOLOGY.COMPLIANCE_REPORT.NODE.VERSIONS}_` });
