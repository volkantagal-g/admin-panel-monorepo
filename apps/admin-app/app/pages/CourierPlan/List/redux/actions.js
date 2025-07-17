import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCourierPlansRequest: {
    name: undefined,
    startDate: undefined,
    endDate: undefined,
    limit: undefined,
    offset: undefined,
  },
  getCourierPlansSuccess: { records: [], totalCount: 0 },
  getCourierPlansFailure: { error: null },
  deleteCourierPlanRequest: { id: undefined },
  deleteCourierPlanSuccess: { },
  deleteCourierPlanFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COURIER_PLAN.LIST}_` });
