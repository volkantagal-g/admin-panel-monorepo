import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getCourierPlanAndCountsRequest: {},
    getCourierPlanAndCountsSuccess: { data: [] },
    getCourierPlanAndCountsFailure: { error: null },

    setSelectedVehicleTypes: { selectedVehicleTypes: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.LIVE_MONITORING.LOCALS.COURIER}_` },
);
