import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  createCourierPlanRequest: { requestBody: {} },
  createCourierPlanSuccess: { data: {} },
  createCourierPlanFailure: { error: null },
}, { prefix: `${REDUX_KEY.COURIER_PLAN.NEW}_` });
