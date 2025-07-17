import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COURIER_GAMIFICATION_TASK.SELECT_KPI}_`;

export const { Types, Creators } = createActions({
  getCourierGamificationKpiRequest: null,
  getCourierGamificationKpiSuccess: { data: null },
  getCourierGamificationKpiFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
