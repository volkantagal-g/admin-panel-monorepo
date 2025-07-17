import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getTaskHistoryRequest: {
    id: undefined,
    limit: undefined,
    offset: undefined,
  },
  getTaskHistorySuccess: { data: null },
  getTaskHistoryFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COURIER_GAMIFICATION_TASK.HISTORY}_` });
