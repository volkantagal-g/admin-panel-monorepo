import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_GAMIFICATION_TASK.LIST}_`;

export const { Types, Creators } = createActions({
  getCourierGamificationTasksRequest: { filters: undefined, limit: undefined, offset: undefined },
  getCourierGamificationTasksSuccess: { data: null, totalCount: null },
  getCourierGamificationTasksFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
