import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getConfigLogRequest: {
    key: undefined,
    startDate: undefined,
    endDate: undefined,
    limit: undefined,
    offset: undefined,
  },
  getConfigLogSuccess: { data: null },
  getConfigLogFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.CONFIG.LOG}_` });
